import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   filterData,
   SearchBox,
} from '../../components/Table/TableActions/handleActions';
import Table from '../../components/Table/Table';
import { columnsCustomer } from '../../Data/columns';
import { sendRequest } from '../../ulti/sendHeaderRequest';
import FormPanel from './FormPanel';
import { isFormDataValid } from '../../components/Table/TableActions/handleActions';
import { alertConfirmDelete } from '../../ulti/modals';
import { RootState } from 'components/features/store';

import { message, Spin } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchCustomers } from 'components/features/thunk/thunk';
import './customers.css';

const Customers = () => {
   const [records, setRecords] = useState<any>([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [limitPage, setLimitPage] = useState(5);
   const darkMode = useSelector((state: RootState) => state.darkMode);
   const { customers, status, totalPages } = useSelector(
      (state: RootState) => state.root.customer
   );

   const dispatch = useAppDispatch();

   const [formData, setFormData] = useState({
      address: '',
      phone: '',
      gender: '',
   });

   useEffect(() => {
      dispatch(
         fetchCustomers({ page: currentPage, limit: limitPage, searchTerm })
      );
   }, [dispatch, currentPage, limitPage, searchTerm]);

   useEffect(() => {
      setRecords(customers);
   }, [customers]);

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
         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const response = await sendRequest(
            'DELETE',
            `api/customers/${customerId}`
         );

         if (response.success) {
            dispatch(
               fetchCustomers({
                  page: currentPage,
                  limit: limitPage,
                  searchTerm,
               })
            );
            message.success(`Delete successful`);
         } else {
            message.error(response.message);
         }
      } catch (error: any) {}
   };

   const handleDelete = async (record: any) => {
      try {
         const customerId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const result = await alertConfirmDelete();

         if (result) {
            setCurrentRecordId(customerId);
            handleDeleteConfirmed(customerId);
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
            message.warning('Invalid ID');
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
               message.success('Updated successfully');
            } else {
               message.error(response.message);
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
            message.info('Please select a record to edit.');
         }
         handleSetFormData();
         setIsEditPanelOpen(false);
      } else {
         message.warning('Please complete all required fields.');
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
         <h1 className={`title-page ${darkMode ? 'darkmode' : ''} `}>
            Customer
         </h1>
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

export default Customers;
