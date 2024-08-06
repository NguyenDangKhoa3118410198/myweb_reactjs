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
import { pageDetailOrder } from '../../Data/fetchData';
import { RootState } from 'components/features/store';

const Orders = () => {
   const [records, setRecords] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const darkMode = useSelector((state: RootState) => state.darkMode);

   const [isModalReview, setModalReview] = useState(false);
   const [isListReviews, setIsListReviews] = useState([]);
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});

   useEffect(() => {
      pageOrders(setRecords);
   }, []);

   const handleReview = async (record: any) => {
      const response = await pageDetailOrder(record.id);

      setIsListReviews(response);

      setModalReview(true);
   };

   const handleView = (record: any) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const columns = columnsOrder({
      handleView,
      handleReview,
   });

   return (
      <main className={`Orders main-container ${darkMode ? 'darkmode' : ''}`}>
         <Table
            title='List of orders'
            columns={columns}
            data={filterData(searchTerm, records)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
            tableActions={{
               setModalView,
               viewCurrent,
               isModalView,
               setModalReview,
               isModalReview,
               isListReviews,
            }}
         />
      </main>
   );
};

export default Orders;
