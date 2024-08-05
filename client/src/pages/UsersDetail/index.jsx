import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   searchBox,
   filterData,
} from '../../components/Table/TableActions/handleActions';
import Table from '../../components/Table/Table';
import { columnsUserDetail } from '../../Data/columns';
import { pageUsersDetail } from '../../Data/fetchData';
import { sendRequest } from '../../ulti/sendHeaderRequest';
import FormPanel from './FormPanel';
import { isFormDataValid } from '../../components/Table/TableActions/handleActions';
import {
   alertMessage,
   alertMessageError,
   alertConfirmDelete,
   alertSuccess,
} from '../../ulti/modals';

import './userDetail.css';

function UsersDetail() {
   const darkMode = useSelector((state) => state.darkMode);
   const [records, setRecords] = useState([]);
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
      pageUsersDetail(setRecords);
   }, []);

   const handleSetFormData = () => {
      setFormData({
         address: '',
         phone: '',
         gender: '',
      });
      setCurrentRecordId(null);
   };

   const handleDeleteConfirmed = async (userDetailId) => {
      try {
         // const customerId = currentRecordId;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const response = await sendRequest(
            'DELETE',
            `api/userDetail/${userDetailId}`
         );

         if (response.success) {
            setRecords((prevRecords) =>
               prevRecords.filter((r) => r.id !== userDetailId)
            );
            console.log('User detail deleted successfully');
         } else {
            console.error('Error deleting user detail:', response.message);
         }
         console.log('delete records', userDetailId);
      } catch (error) {
         console.error('Failed to delete user detail:', error.message);
      }
   };

   const handleDelete = async (record) => {
      try {
         const userDetailId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const result = await alertConfirmDelete();

         if (result.isConfirmed) {
            setCurrentRecordId(userDetailId);
            handleDeleteConfirmed(userDetailId);
            alertSuccess(`Deleting record with ID: ${userDetailId}`);
         } else {
            console.log('Cancelled delete');
         }
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
            alertMessageError('Invalid ID');
            return;
         }

         try {
            const response = await sendRequest(
               'PATCH',
               `api/userDetail/${currentRecordId}/edit/admin`,
               record
            );

            if (response.success) {
               setRecords(
                  records.map((r) =>
                     r.id === currentRecordId ? { ...r, ...record } : r
                  )
               );
               alertSuccess('Updated user detail successfully');
            } else {
               console.error('Error updating user detail:', response.message);
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
            alertMessage('Please select a record to edit.');
         }
         handleSetFormData();
      } else {
         alertMessageError(
            'Unable to save data because formData is empty or contains a null value.'
         );
      }
   };

   const handleClose = (e) => {
      e.preventDefault();
      handleSetFormData();
      setIsEditPanelOpen(false);
   };

   const columns = columnsUserDetail({
      handleView,
      handleEditClick,
      handleDelete,
   });

   return (
      <main
         className={`user-detail-wrapper main-container ${
            darkMode ? 'darkmode' : ''
         } `}
      >
         <Table
            title='List table Users Detail'
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
}

export default UsersDetail;
