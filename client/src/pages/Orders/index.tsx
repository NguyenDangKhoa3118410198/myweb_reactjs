import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { columnsOrder } from '../../Data/columns';
import {
   searchBox,
   filterData,
} from '../../components/Table/TableActions/handleActions';
import './orders.css';
import { pageDetailOrder } from '../../Data/fetchData';
import { RootState } from 'components/features/store';
import { Spin } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchOrders } from 'components/features/thunk/thunk';

const Orders = () => {
   const [records, setRecords] = useState<any>([]);
   const [searchTerm, setSearchTerm] = useState('');

   const [isModalReview, setModalReview] = useState(false);
   const [isListReviews, setIsListReviews] = useState([]);
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [currentPage, setCurrentPage] = useState(1);
   const [limitPage, setLimitPage] = useState(5);

   const dispatch = useAppDispatch();
   const darkMode = useSelector((state: RootState) => state.darkMode);
   const { orders, status, totalPages } = useSelector(
      (state: RootState) => state.root.order
   );

   useEffect(() => {
      dispatch(fetchOrders({ page: currentPage, limit: limitPage }));
   }, [dispatch, currentPage, limitPage]);

   useEffect(() => {
      setRecords(orders);
   }, [orders]);

   const handleReview = async (record: any) => {
      const response = await pageDetailOrder(record.id);

      setIsListReviews(response);

      setModalReview(true);
   };

   const handleView = (record: any) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const handleLimitChange = (newLimit: number) => {
      setLimitPage(newLimit);
      setCurrentPage(1);
   };

   const columns = columnsOrder({
      handleView,
      handleReview,
   });

   return (
      <main className={`Orders main-container ${darkMode ? 'darkmode' : ''}`}>
         <Spin spinning={status === 'loading'}>
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
               pagination={{
                  limitPage,
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  onLimitChange: handleLimitChange,
               }}
            />
         </Spin>
      </main>
   );
};

export default Orders;
