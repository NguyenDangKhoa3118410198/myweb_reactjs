import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   searchBox,
   filterData,
} from '../../components/Table/TableActions/handleActions';
import Table from '../../components/Table/Table';
import { columnsCustomer } from '../../Data/columns';
import { pageCustomers } from '../../Data/fetchData';
import OnTopButton from '../../components/OnTop/OnTop';
import './customers.css';

function Customers() {
   const darkMode = useSelector((state) => state.darkMode);
   const [records, setRecords] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});

   const handleDelete = (record) => {
      if (records.length === 0) {
         console.log('No records to delete');
         return;
      }
      setRecords(records.filter((r) => r.id !== record.id));
   };

   const handleView = (record) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const columns = columnsCustomer({
      handleView,
      handleDelete,
   });

   useEffect(() => pageCustomers(setRecords), []);

   return (
      <main className={`customer-wrapper ${darkMode ? 'darkmode' : ''} `}>
         <div id='top' style={{ opacity: '0' }}></div>

         <Table
            columns={columns}
            data={filterData(searchTerm, records)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
            tableActions={{
               viewCurrent,
               setModalView,
               isModalView,
            }}
         />
         <OnTopButton />
      </main>
   );
}

export default Customers;
