import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table/Table';
import { columnsOrder } from '../../Data/columns';

import { v4 as uuidv4 } from 'uuid';
import {
   removeExtraSpaces,
   searchBox,
   formDataObjectWithExtraSpacesRemoved,
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

   function caculateTotal(formData) {
      const total = Number(formData.amount) * Number(formData.price);
      formData.total = total;
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      caculateTotal(formData);

      if (
         Object.values(formData).every(
            (value) =>
               value !== null &&
               value !== undefined &&
               removeExtraSpaces(value) !== ''
         )
      ) {
         const newFormData = formDataObjectWithExtraSpacesRemoved(formData);
         handleSave(null, newFormData);
         handleSetFormData();
      } else {
         alert(
            'Không thể lưu dữ liệu vì formData rỗng hoặc chứa giá trị null.'
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

      if (
         formData &&
         Object.values(formData).every(
            (value) =>
               value !== null &&
               value !== undefined &&
               removeExtraSpaces(value) !== ''
         )
      ) {
         const newFormData = formDataObjectWithExtraSpacesRemoved(formData);
         handleSave(currentRecordId, newFormData);
         handleSetFormData();
      } else {
         console.log(
            'Không thể lưu dữ liệu vì formData rỗng hoặc chứa giá trị null.'
         );
      }
   };

   const handleSave = (currentRecordId, record) => {
      if (currentRecordId) {
         const currentRecord = records.find((r) => r.id === currentRecordId);
         if (!currentRecord) {
            alert('ID không tồn tại');
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

   function handleSearch(event) {
      setSearchTerm(event.target.value);
   }

   function filterData(records) {
      return records.filter((row) =>
         Object.values(row).some(
            (value) =>
               typeof value === 'string' &&
               value
                  .toLowerCase()
                  .includes(removeExtraSpaces(searchTerm.toLowerCase()))
         )
      );
   }
   const columns = columnsOrder(handleEditClick, handleDelete);

   return (
      <main className='Orders'>
         <div className='add-filter-wrapper'>
            <button
               className='btn btn-success btn-add'
               onClick={() => {
                  setIsAddPanelOpen(true);
                  setIsEditPanelOpen(false);
               }}
            >
               Add
            </button>
         </div>

         <Table
            title='List of orders'
            columns={columns}
            data={filterData(records)}
            searchBox={searchBox(searchTerm, handleSearch)}
            isAddPanelOpen={isAddPanelOpen}
            isEditPanelOpen={isEditPanelOpen}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            handleClose={handleClose}
            formData={formData}
            setFormData={setFormData}
            FormPanel={FormPanel}
         />
      </main>
   );
}

export default Orders;
