import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   searchBox,
   filterData,
} from '../../components/Table/TableActions/handleActions';
import CrudModal from '../../components/ReactModal/CrudModal';
import Table from '../../components/Table/Table';
import { columnsCustomer } from '../../Data/columns';
import { pageCustomers } from '../../Data/fetchData';
import OnTopButton from '../../components/OnTop/OnTop';
import './customers.css';

function Customers() {
   const darkMode = useSelector((state) => state.darkMode);
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

   useEffect(() => pageCustomers(setRecords), []);

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

   return (
      <main className={`customer-wrapper ${darkMode ? 'darkmode' : ''} `}>
         <div id='top' style={{ opacity: '0' }}></div>

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
            data={filterData(searchTerm, records)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
         />
         <OnTopButton />
      </main>
   );
}

export default Customers;
