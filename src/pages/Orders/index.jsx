import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { columnsOrder } from '../../Data/columns';
import { pageOrders } from '../../Data/fetchData';
import { v4 as uuidv4 } from 'uuid';
import {
   searchBox,
   filterData,
   isFormDataValid,
} from '../../components/Table/TableActions/handleActions';
import FormPanel from './FormPanel';
import './orders.css';
// import { pageReview } from '../../Data/fetchData';
import OnTopButton from '../../components/OnTop/OnTop';

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

   const handleSave = (currentRecordId, record) => {
      if (currentRecordId) {
         const currentRecord = records.find((r) => r.id === currentRecordId);
         if (!currentRecord) {
            alert('Invalid ID');
            return;
         }

         setRecords(
            records.map((r) =>
               r.id === currentRecordId ? { ...r, ...record } : r
            )
         );
      } else {
         const newRecord = { ...record, id: uuidv4() };
         setRecords([...records, newRecord]);
      }
   };

   const handleDelete = (record) => {
      if (records.length === 0) {
         console.log('No records to delete');
         return;
      }
      setRecords(records.filter((r) => r.id !== record.id));
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
