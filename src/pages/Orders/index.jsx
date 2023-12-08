import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { columnsOrder } from '../../Data/columns';
import { pageOrders } from '../../Data/fetchData';
import {
   searchBox,
   filterData,
} from '../../components/Table/TableActions/handleActions';
import './orders.css';
import OnTopButton from '../../components/OnTop/OnTop';
import { pageDetailOrder } from '../../Data/fetchData';

function Orders() {
   const [records, setRecords] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const darkMode = useSelector((state) => state.darkMode);

   const [isModalReview, setModalReview] = useState(false);
   const [isListReviews, setIsListReviews] = useState([]);

   useEffect(() => {
      pageOrders(setRecords);
   }, []);

   const handleReview = async (record) => {
      const response = await pageDetailOrder(record.id);

      setIsListReviews(response);

      setModalReview(true);
   };

   const columns = columnsOrder({
      handleReview,
   });

   return (
      <main className={`Orders  ${darkMode ? 'darkmode' : ''}`}>
         <div id='top' style={{ opacity: '0' }}></div>

         <Table
            title='List of orders'
            columns={columns}
            data={filterData(searchTerm, records)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
            tableActions={{
               setModalReview,
               isModalReview,
               isListReviews,
            }}
         />

         <OnTopButton />
      </main>
   );
}

export default Orders;
