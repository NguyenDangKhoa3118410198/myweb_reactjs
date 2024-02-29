import React, { useEffect } from 'react';
import './dashboardBoxCharts.css';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { LargeBox } from './Box';
import Cart from './Carts/Card';
import {
   // eslint-disable-next-line no-unused-vars
   data,
   infoCard,
   countingProducts,
   countingUsers,
   countingOrders,
} from './DataBoxes';
import {
   setDataUsers,
   setDataOrders,
   setDataProducts,
   setDataAccess,
} from '../features/appInformation/appInformationSlice';

function DashboardBoxCharts() {
   const dispatch = useDispatch();

   const dataUsers = useSelector((state) => state.appInformation.dataUsers);
   const dataProducts = useSelector(
      (state) => state.appInformation.dataProducts
   );
   const dataOrders = useSelector((state) => state.appInformation.dataOrders);
   const dataAccess = useSelector((state) => state.appInformation.dataUsers);

   useEffect(() => {
      Promise.all([countingUsers(), countingOrders(), countingProducts()])
         .then((results) => {
            const [users, orders, products] = results;
            console.log('Fetching app information and dispatching it');

            if (users && orders && products) {
               dispatch(setDataUsers(users));
               dispatch(setDataProducts(products));
               dispatch(setDataOrders(orders));
               dispatch(setDataAccess(users));
            }
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }, [dispatch]);

   return (
      <div className='dashboard-charts-box-container'>
         <div className='dashboard-grid-container'>
            <div className='box box1'>
               <Cart infoCard={infoCard[0]} data={dataUsers} />
            </div>
            <div className='box box2'>
               <Cart infoCard={infoCard[1]} data={dataOrders} />
            </div>
            <div className='box box3'>
               <Cart infoCard={infoCard[2]} data={dataProducts} />
            </div>
            <div className='box box4'>
               <Cart infoCard={infoCard[3]} data={dataAccess} />
            </div>
            <div className='box box5'>
               <LargeBox data={data} chartModel={'PieChartBox'} />
            </div>

            <div className='box box6'>
               <LargeBox data={data} chartModel={'TotalChartBox'} />
            </div>

            <div className='box box7'>
               <LargeBox data={data} chartModel={'RadialBarChartBox'} />
            </div>
         </div>
      </div>
   );
}

export default DashboardBoxCharts;
