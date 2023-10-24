import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrudModal from '../../components/ReactModal/CrudModal';
import ActionsCell from '../../components/ReactModal/ActionsCell/ActionsCell';
import Table from '../../components/Table/Table';
import './Orders.css';

function Orders() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [records, setRecords] = useState([]);
   const [currentRecord, setCurrentRecord] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');

   const columns = [
      {
         name: 'ID',
         selector: (row) => row.id,
         sortable: true,
      },
      {
         name: 'Title',
         selector: (row) => row.title,
         sortable: true,
      },
      {
         name: 'Quanlity',
         selector: (row) => row.quantity,
         sortable: true,
      },
      {
         name: 'Price',
         selector: (row) => row.price,
         sortable: true,
      },
      {
         name: 'Total',
         selector: (row) => row.total,
         sortable: true,
      },
      {
         name: 'Action',
         sortable: false,
         cell: (record) => (
            <ActionsCell
               record={record}
               handleEditClick={handleEditClick}
               handleAddClick={handleAddClick}
               handleDelete={handleDelete}
            />
         ),
      },
   ];

   useEffect(() => {
      axios
         .get('https://dummyjson.com/carts')
         .then((response) => {
            const data = response.data;

            const infoProducts = data.carts
               .map((cart) => {
                  return cart.products.map((product) => {
                     return {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: product.quantity,
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

   const handleAddClick = () => {
      setCurrentRecord(null);
      setIsModalOpen(true);
   };

   const handleEditClick = (record) => {
      setCurrentRecord(record);
      setIsModalOpen(true);
   };

   const handleSave = (record) => {
      if (record.id) {
         setRecords(
            records.map((r) => (r.id === record.id ? { ...r, ...record } : r))
         );
      } else {
         const newRecord = { ...record, id: Date.now() };
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
               value.toLowerCase().includes(searchTerm.toLowerCase())
         )
      );
   }

   return (
      <main className='Orders'>
         <div className='add-filter-wrapper'>
            <button
               className='btn btn-success btn-add'
               onClick={() => handleAddClick()}
            >
               Add
            </button>
            <input
               className='searchBox'
               type='text'
               placeholder='Search...'
               value={searchTerm}
               onChange={handleSearch}
            />
         </div>
         <CrudModal
            record={currentRecord}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            onSave={handleSave}
            onDelete={handleDelete}
         />

         <Table columns={columns} data={filterData(records)} />
      </main>
   );
}

export default Orders;
