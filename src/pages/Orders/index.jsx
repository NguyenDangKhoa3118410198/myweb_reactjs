import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table/Table';
import { columnsOrder } from '../../Data/columns';

import { v4 as uuidv4 } from 'uuid';
import {
   searchBox,
   filterData,
   isFormDataValid,
} from '../../components/Table/TableActions/handleActions';
import './orders.css';
import FormPanel from './FormPanel';

function Orders() {
   const [records, setRecords] = useState([]);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');

   // ------------------------------------
   const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [isModalView, setModalView] = useState(false);

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

   useEffect(() => {
      axios
         .get('https://dummyjson.com/carts')
         .then((response) => {
            const data = response.data;

            const infoProducts = data.carts
               .map((cart) => {
                  return cart.products.map((product) => {
                     return {
                        id: uuidv4(),
                        title: product.title,
                        price: product.price,
                        amount: product.quantity,
                        total: product.total,
                     };
                  });
               })
               .flat();
            setRecords(infoProducts);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

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

   const handleSubmit = (e) => {
      e.preventDefault();
      caculateTotal(formData);

      const newFormData = isFormDataValid(formData);
      if (newFormData) {
         handleSave(null, newFormData);
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

   const handleEdit = (e) => {
      e.preventDefault();
      caculateTotal(formData);

      const newFormData = isFormDataValid(formData);
      if (newFormData) {
         if (currentRecordId) {
            handleSave(currentRecordId, newFormData);
            handleSetFormData();
         } else {
            alert('Please select a record to edit.');
         }
      } else {
         alert(
            'Unable to save data because formData is empty or contains a null value.'
         );
      }
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

   const columns = columnsOrder(handleView, handleEditClick, handleDelete);

   return (
      <main className='Orders'>
         <Table
            title='List of orders'
            columns={columns}
            data={filterData(searchTerm, records)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
            formData={formData}
            setFormData={setFormData}
            FormPanel={FormPanel}
            // setModalView={setModalView}
            // viewCurrent={viewCurrent}
            tableActions={{
               setModalView,
               viewCurrent,
               isModalView,
               isAddPanelOpen,
               isEditPanelOpen,
               setIsAddPanelOpen,
               setIsEditPanelOpen,
            }}
            handleActions={{
               handleSubmit,
               handleEdit,
               handleClose,
            }}
         />
      </main>
   );
}

export default Orders;
