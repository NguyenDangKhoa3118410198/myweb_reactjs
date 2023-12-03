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
import { sendRequest } from '../../ulti/sendHeaderRequest';

import './customers.css';

function Customers() {
   const darkMode = useSelector((state) => state.darkMode);
   const [records, setRecords] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});

   const handleDelete = async (record) => {
      try {
         const customerId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const response = await sendRequest(
            'DELETE',
            `api/customers/${customerId}`
         );

         if (response.success) {
            setRecords((prevRecords) =>
               prevRecords.filter((r) => r.id !== record.id)
            );
            console.log('Customer deleted successfully');
         } else {
            console.error('Error deleting customer:', response.message);
         }
      } catch (error) {
         console.error('Failed to delete customer:', error.message);
      }
   };

   const handleView = (record) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const columns = columnsCustomer({
      handleView,
      handleDelete,
   });

   useEffect(() => {
      pageCustomers(setRecords);
   }, []);

   return (
      <main className={`customer-wrapper ${darkMode ? 'darkmode' : ''} `}>
         <div id='top' style={{ opacity: '0' }}></div>

         <Table
            title='List table Customers'
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
