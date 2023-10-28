import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrudModal from '../../components/ReactModal/CrudModal';
import Table from '../../components/Table/Table';
import TableActions from '../../components/Table/TableActions/TableActions';
import { v4 as uuidv4 } from 'uuid';
import { searchBox } from '../../components/Table/TableActions/handleActions';
import { columnsCustomer } from '../../Data/columns';
import './customers.css';

function Customers() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [records, setRecords] = useState([]);
   const [currentRecord, setCurrentRecord] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');

   const handleEditClick = (record) => {
      setCurrentRecord(record);
      setIsModalOpen(true);
   };

   const handleDelete = (record) => {
      if (records.length === 0) {
         console.log('No records to delete');
         return;
      }
      setRecords(records.filter((r) => r.id !== record.id));
   };

   const columns = columnsCustomer(handleEditClick, handleDelete);

   // const columns = [
   //    {
   //       name: 'ID',
   //       selector: (row) => row.id,
   //       sortable: true,
   //    },
   //    {
   //       name: 'First name',
   //       selector: (row) => row.firstName,
   //       sortable: true,
   //    },
   //    {
   //       name: 'Last name',
   //       selector: (row) => row.lastName,
   //       sortable: true,
   //    },
   //    {
   //       name: 'Maiden Name',
   //       selector: (row) => row.maidenName,
   //       sortable: true,
   //    },
   //    {
   //       name: 'Age',
   //       selector: (row) => row.age,
   //       sortable: true,
   //    },
   //    {
   //       name: 'Gender',
   //       selector: (row) => row.gender,
   //       sortable: true,
   //    },
   //    {
   //       name: 'Phone',
   //       selector: (row) => row.phone,
   //       sortable: true,
   //    },
   //    {
   //       name: 'Email',
   //       selector: (row) => row.email,
   //       sortable: true,
   //    },
   //    {
   //       name: 'Action',
   //       sortable: false,
   //       cell: (record) => TableActions(handleEditClick, handleDelete, record),
   //    },
   // ];

   useEffect(() => {
      axios
         .get('https://dummyjson.com/users')
         .then((response) => {
            const data = response.data;

            const infoCustomers = data.users.map((user) => {
               return {
                  id: uuidv4(),
                  firstName: user.firstName,
                  lastName: user.lastName,
                  maidenName: user.maidenName,
                  age: user.age,
                  gender: user.gender,
                  email: user.email,
                  phone: user.phone,
               };
            });
            setRecords(infoCustomers);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   const handleAddClick = () => {
      setCurrentRecord(null);
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
         </div>
         <CrudModal
            record={currentRecord}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            onSave={handleSave}
            onDelete={handleDelete}
         />

         <Table
            columns={columns}
            data={filterData(records)}
            searchBox={searchBox(searchTerm, handleSearch)}
         />
      </main>
   );
}

export default Customers;
