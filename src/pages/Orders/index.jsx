import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { columnsOrder } from '../../Data/columns';
import { pageOrders } from '../../Data/fetchData';
import {
   searchBox,
   filterData,
   isFormDataValid,
} from '../../components/Table/TableActions/handleActions';
import FormPanel from './FormPanel';
import './orders.css';
import OnTopButton from '../../components/OnTop/OnTop';
import { sendRequest } from '../../ulti/sendHeaderRequest';

function Orders() {
   const [records, setRecords] = useState([]);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const darkMode = useSelector((state) => state.darkMode);

   // ------------------------------------
   const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

   const [viewCurrent, setViewCurrent] = useState({});
   const [isModalView, setModalView] = useState(false);

   // const [isModalReview, setModalReview] = useState(false);
   // const [isListReviews, setIsListReviews] = useState([]);

   useEffect(() => {
      pageOrders(setRecords);
   }, []);

   const [formData, setFormData] = useState({
      title: '',
      amount: 1,
      price: 1,
      total: 0,
   });

   const handleSetFormData = () => {
      setFormData({
         title: '',
         amount: 1,
         price: 1,
         total: 0,
      });
      setCurrentRecordId(null);
   };

   const handleClose = (e) => {
      e.preventDefault();
      handleSetFormData();
      setIsAddPanelOpen(false);
      setIsEditPanelOpen(false);
   };

   const handleView = (record) => {
      setModalView(true);
      setViewCurrent(record);
   };

   function caculateTotal(formData) {
      const total = Number(formData.amount) * Number(formData.price);
      formData.total = total;
   }

   const handleSubmitAndEdit = (e) => {
      e.preventDefault();
      caculateTotal(formData);

      const newFormData = isFormDataValid(formData);

      if (newFormData) {
         if (currentRecordId && isEditPanelOpen) {
            handleSave(currentRecordId, newFormData);
         } else if (!currentRecordId && !isEditPanelOpen) {
            handleSave(null, newFormData);
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

   const handleEditClick = (record) => {
      setIsEditPanelOpen(true);
      setIsAddPanelOpen(false);
      setFormData({
         title: record.title,
         amount: record.amount,
         price: record.price,
         total: record.quanlity,
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
               'POST',
               `api/orders/${currentRecordId}/edit`,
               record
            );

            if (response.success) {
               setRecords(
                  records.map((r) =>
                     r.id === currentRecordId ? { ...r, ...record } : r
                  )
               );
               console.log('Updated order successfully');
            } else {
               console.error('Error updating order:', response.message);
            }
         } catch (error) {
            console.error('Error sending request:', error.message);
         }
      } else {
         try {
            const response = await sendRequest(
               'POST',
               'api/orders/add',
               record
            );

            if (response.success) {
               const newRecord = response.newOrder;
               setRecords([...records, newRecord]);
               console.log('New order added successfully:', newRecord);
            } else {
               console.error('Error adding new order:', response.message);
            }
         } catch (error) {
            console.error('Error sending request:', error.message);
         }
      }
   };

   const handleDelete = async (record) => {
      try {
         const orderId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const response = await sendRequest('DELETE', `api/orders/${orderId}`);

         if (response.success) {
            setRecords((prevRecords) =>
               prevRecords.filter((r) => r.id !== record.id)
            );
            console.log('Order deleted successfully');
         } else {
            console.error('Error deleting order:', response.message);
         }
      } catch (error) {
         console.error('Failed to delete order:', error.message);
      }
   };

   // const handleReview = (record) => {
   //    //missing recordID
   //    pageReview(47321729, setIsListReviews);
   //    setModalReview(true);
   // };

   const columns = columnsOrder({
      handleView,
      handleEditClick,
      handleDelete,
      // handleReview,
   });

   return (
      <main className={`Orders  ${darkMode ? 'darkmode' : ''}`}>
         <div id='top' style={{ opacity: '0' }}></div>

         <Table
            title='List of orders'
            columns={columns}
            data={filterData(searchTerm, records)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
            formData={formData}
            setFormData={setFormData}
            FormPanel={FormPanel}
            tableActions={{
               viewCurrent,
               setModalView,
               // setModalReview,
               // isListReviews,
               // isModalReview,
               isModalView,
               isAddPanelOpen,
               isEditPanelOpen,
               setIsAddPanelOpen,
               setIsEditPanelOpen,
               setCurrentRecordId,
            }}
            handleActions={{
               handleSubmitAndEdit,
               handleClose,
            }}
         />

         <OnTopButton />
      </main>
   );
}

export default Orders;
