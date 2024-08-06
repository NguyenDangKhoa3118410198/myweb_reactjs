import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   searchBox,
   filterData,
} from '../../components/Table/TableActions/handleActions';
import Table from '../../components/Table/Table';
import { columnsCustomer } from '../../Data/columns';
import { pageCustomers } from '../../Data/fetchData';
import { sendRequest } from '../../ulti/sendHeaderRequest';
import FormPanel from './FormPanel';
import { isFormDataValid } from '../../components/Table/TableActions/handleActions';
import {
   alertMessage,
   alertMessageError,
   alertConfirmDelete,
   alertSuccess,
} from '../../ulti/modals';
import { RootState } from 'components/features/store';

import './customers.css';

const Customers = () => {
   const darkMode = useSelector((state: RootState) => state.darkMode);
   const [records, setRecords] = useState<any>([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [currentRecordId, setCurrentRecordId] = useState(null);

   const [formData, setFormData] = useState({
      address: '',
      phone: '',
      gender: '',
   });

   useEffect(() => {
      pageCustomers(setRecords);
   }, []);

   const handleSetFormData = () => {
      setFormData({
         address: '',
         phone: '',
         gender: '',
      });
      setCurrentRecordId(null);
   };

   const handleDeleteConfirmed = async (customerId: string) => {
      try {
         // const customerId = currentRecordId;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const response = await sendRequest(
            'DELETE',
            `api/customers/${customerId}`
         );

         if (response.success) {
            setRecords((prevRecords: any) =>
               prevRecords.filter((r: any) => r.id !== customerId)
            );
            console.log('Customer deleted successfully');
         } else {
            console.error('Error deleting customer:', response.message);
         }
         console.log('delete records', customerId);
      } catch (error: any) {
         console.error('Failed to delete customer:', error.message);
      }
   };

   const handleDelete = async (record: any) => {
      try {
         const customerId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const result = await alertConfirmDelete();

         if (result.isConfirmed) {
            setCurrentRecordId(customerId);
            handleDeleteConfirmed(customerId);
            alertSuccess(`Deleting record with ID: ${customerId}`);
         } else {
            console.log('Cancelled delete');
         }
      } catch (error: any) {
         console.error('Failed to initiate delete:', error.message);
      }
   };

   const handleView = (record: any) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const handleEditClick = (record: any) => {
      setIsEditPanelOpen(true);
      setFormData({
         address: record.address,
         phone: record.phone,
         gender: record.gender,
      });
      setCurrentRecordId(record.id);
   };

   const handleSave = async (currentRecordId: string, record: any) => {
      if (currentRecordId) {
         const currentRecord = records.find(
            (r: any) => r.id === currentRecordId
         );

         if (!currentRecord) {
            alertMessageError('Invalid ID');
            return;
         }

         try {
            const response = await sendRequest(
               'PATCH',
               `api/customers/${currentRecordId}/edit/admin`,
               record
            );

            if (response.success) {
               setRecords(
                  records.map((r: any) =>
                     r.id === currentRecordId ? { ...r, ...record } : r
                  )
               );
               alertSuccess('Updated customer successfully');
            } else {
               console.error('Error updating customer:', response.message);
            }
         } catch (error: any) {
            console.error('Error sending request:', error.message);
         }
      }
   };

   const handleSubmitAndEdit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newFormData = isFormDataValid(formData);

      if (newFormData) {
         if (currentRecordId && isEditPanelOpen) {
            handleSave(currentRecordId, newFormData);
         } else {
            alertMessage('Please select a record to edit.');
         }
         handleSetFormData();
      } else {
         alertMessageError(
            'Unable to save data because formData is empty or contains a null value.'
         );
      }
   };

   const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleSetFormData();
      setIsEditPanelOpen(false);
   };

   const columns = columnsCustomer({
      handleView,
      handleEditClick,
      handleDelete,
   });

   return (
      <main
         className={`customer-wrapper main-container ${
            darkMode ? 'darkmode' : ''
         } `}
      >
         <Table
            title='List table Customers'
            columns={columns}
            data={filterData(searchTerm, records)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
            formData={formData}
            setFormData={setFormData}
            FormPanel={FormPanel}
            tableActions={{
               viewCurrent,
               setModalView,
               isModalView,
               isEditPanelOpen,
               setIsEditPanelOpen,
               setCurrentRecordId,
            }}
            handleActions={{
               handleSubmitAndEdit,
               handleClose,
            }}
         />
      </main>
   );
};

export default Customers;
