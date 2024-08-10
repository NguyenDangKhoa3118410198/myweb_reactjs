import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { columnsOrder } from '../../Data/columns';
import {
   filterData,
   SearchBox,
} from '../../components/Table/TableActions/handleActions';
import { RootState } from 'components/features/store';
import { Spin } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchOrders, fetchReviewOrder } from 'components/features/thunk/thunk';
import './orders.css';

const Orders = () => {
   const [records, setRecords] = useState<any>([]);
   const [searchTerm, setSearchTerm] = useState('');

   const [isModalReview, setModalReview] = useState(false);
   const [isListReviews, setIsListReviews] = useState<any>([]);
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [currentPage, setCurrentPage] = useState(1);
   const [limitPage, setLimitPage] = useState(5);

   const dispatch = useAppDispatch();
   const darkMode = useSelector((state: RootState) => state.darkMode);
   const { orders, status, totalPages } = useSelector(
      (state: RootState) => state.root.order
   );
   const reviewByOrderId = useSelector(
      (state: RootState) => state.root.review.reviewByOrderId
   );

   useEffect(() => {
      dispatch(
         fetchOrders({ page: currentPage, limit: limitPage, searchTerm })
      );
   }, [dispatch, currentPage, limitPage, searchTerm]);

   useEffect(() => {
      setRecords(orders);
   }, [orders]);

   useEffect(() => {
      setIsListReviews(reviewByOrderId);
   }, [reviewByOrderId]);

   const handleReview = (record: any) => {
      dispatch(fetchReviewOrder(record.id));
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
         <h1 className={`title-page ${darkMode ? 'darkmode' : ''} `}>Order</h1>
         <Spin spinning={status === 'loading'}>
            <Table
               columns={columns}
               data={filterData(searchTerm, records)}
               searchBox={
                  <SearchBox
                     searchTerm={searchTerm}
                     setSearchTerm={setSearchTerm}
                  />
               }
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
