import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   searchBox,
   filterData,
} from '../../components/Table/TableActions/handleActions';
import Table from '../../components/Table/Table';
import { columnsCustomer } from '../../Data/columns';
import { pageCustomers } from '../../Data/fetchData';
import OnTopButton from '../../components/OnTop/OnTop';
import { sendRequest } from '../../ulti/sendHeaderRequest';
import FormPanel from './FormPanel';
import { isFormDataValid } from '../../components/Table/TableActions/handleActions';

import './customers.css';

function Customers() {
   const darkMode = useSelector((state) => state.darkMode);
   const [records, setRecords] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [showDeleteModal, setShowDeleteModal] = useState(false);

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

   const handleDeleteConfirmed = async () => {
      try {
         const customerId = currentRecordId;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const response = await sendRequest(
            'DELETE',
            `api/customers/${customerId}`
         );

         if (response.success) {
            setRecords((prevRecords) =>
               prevRecords.filter((r) => r.id !== customerId)
            );
            console.log('Customer deleted successfully');
         } else {
            console.error('Error deleting customer:', response.message);
         }
         console.log('delete records', customerId);
      } catch (error) {
         console.error('Failed to delete customer:', error.message);
      } finally {
         setShowDeleteModal(false);
      }
   };

   const handleDelete = async (record) => {
      try {
         const customerId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         setShowDeleteModal(true);
         setCurrentRecordId(customerId);
      } catch (error) {
         console.error('Failed to initiate delete:', error.message);
      }
   };

   const handleView = (record) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const handleEditClick = (record) => {
      setIsEditPanelOpen(true);
      setFormData({
         address: record.address,
         phone: record.phone,
         gender: record.gender,
      });
      setCurrentRecordId(record.id);
   };

   const handleSave = async (currentRecordId, record) => {
      if (currentRecordId) {
         const currentRecord = records.find((r) => r.id === currentRecordId);

         if (!currentRecord) {
            alert('Invalid ID');
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
                  records.map((r) =>
                     r.id === currentRecordId ? { ...r, ...record } : r
                  )
               );
               console.log('Updated customer successfully');
            } else {
               console.error('Error updating customer:', response.message);
            }
         } catch (error) {
            console.error('Error sending request:', error.message);
         }
      }
   };

   const handleSubmitAndEdit = (e) => {
      e.preventDefault();
      const newFormData = isFormDataValid(formData);

      if (newFormData) {
         if (currentRecordId && isEditPanelOpen) {
            handleSave(currentRecordId, newFormData);
         } else {
            alert('Please select a record to edit.');
         }
         handleSetFormData();
      } else {
         alert(
            'Unable to save data because formData is empty or contains a null value.'
         );
      }
   };

   const handleClose = (e) => {
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
      <main className={`customer-wrapper ${darkMode ? 'darkmode' : ''} `}>
         <div id='top' style={{ opacity: '0' }}></div>

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

               showDeleteModal,
               setShowDeleteModal,
            }}
            handleActions={{
               handleDeleteConfirmed,
               handleSubmitAndEdit,
               handleClose,
            }}
         />
         <OnTopButton />
      </main>
   );
}

export default Customers;
