import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   filterData,
   SearchBox,
} from '../../components/Table/TableActions/handleActions';
import Table from '../../components/Table/Table';
import { columnsUserDetail } from '../../Data/columns';
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
import { RootState } from 'components/features/store';
import { Spin } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchUserDetail } from 'components/features/thunk/thunk';

const UsersDetail = () => {
   const darkMode = useSelector((state: RootState) => state.darkMode);
   const [records, setRecords] = useState<any>([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [limitPage, setLimitPage] = useState(5);
   const dispatch = useAppDispatch();
   const { userDetails, status, totalPages } = useSelector(
      (state: RootState) => state.root.userDetail
   );

   const [formData, setFormData] = useState({
      address: '',
      phone: '',
      gender: '',
   });

   useEffect(() => {
      dispatch(
         fetchUserDetail({ page: currentPage, limit: limitPage, searchTerm })
      );
   }, [dispatch, currentPage, limitPage, searchTerm]);

   useEffect(() => {
      setRecords(userDetails);
   }, [userDetails]);

   const handleSetFormData = () => {
      setFormData({
         address: '',
         phone: '',
         gender: '',
      });
      setCurrentRecordId(null);
   };

   const handleDeleteConfirmed = async (userDetailId: string) => {
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
            setRecords((prevRecords: any) =>
               prevRecords.filter((r: any) => r.id !== userDetailId)
            );
            console.log('User detail deleted successfully');
         } else {
            console.error('Error deleting user detail:', response.message);
         }
         console.log('delete records', userDetailId);
      } catch (error: any) {
         console.error('Failed to delete user detail:', error.message);
      }
   };

   const handleDelete = async (record: any) => {
      try {
         const userDetailId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const result = await alertConfirmDelete();

         if (result) {
            setCurrentRecordId(userDetailId);
            handleDeleteConfirmed(userDetailId);
            alertSuccess(`Deleting record with ID: ${userDetailId}`);
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
               `api/userDetail/${currentRecordId}/edit/admin`,
               record
            );

            if (response.success) {
               setRecords(
                  records.map((r: any) =>
                     r.id === currentRecordId ? { ...r, ...record } : r
                  )
               );
               alertSuccess('Updated user detail successfully');
            } else {
               console.error('Error updating user detail:', response.message);
            }
         } catch (error: any) {
            console.error('Error sending request:', error.message);
         }
      }
   };

   const handleSubmitAndEdit = (values: any) => {
      const newFormData = isFormDataValid(values);

      if (newFormData) {
         if (currentRecordId && isEditPanelOpen) {
            handleSave(currentRecordId, newFormData);
         } else {
            alertMessage('Please select a record to edit.');
         }
         handleSetFormData();
         setIsEditPanelOpen(false);
      } else {
         alertMessageError(
            'Unable to save data because formData is empty or contains a null value.'
         );
      }
   };

   const handleClose = () => {
      handleSetFormData();
      setIsEditPanelOpen(false);
   };

   const handleLimitChange = (newLimit: number) => {
      setLimitPage(newLimit);
      setCurrentPage(1);
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
         <Spin spinning={status === 'loading'}>
            <Table
               columns={columns}
               data={filterData(searchTerm, records)}
               searchBox={
                  <SearchBox
                     searchTerm={searchTerm}
                     setSearchTerm={setSearchTerm}
                  />
               }
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
               pagination={{
                  limitPage,
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  onLimitChange: handleLimitChange,
               }}
            />
         </Spin>
      </main>
   );
};

export default UsersDetail;
