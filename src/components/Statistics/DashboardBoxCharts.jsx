import React, { useState, useEffect } from 'react';
import './dashboardBoxCharts.css';
// eslint-disable-next-line no-unused-vars
import { Box, LargeBox } from './Box';
import Cart from './Carts/Card';
import {
   // eslint-disable-next-line no-unused-vars
   data,
   infoCard,
   countingProducts,
   countingUsers,
   countingOrders,
} from './DataBoxes';

function DashboardBoxCharts() {
   const [dataUsers, setDataUser] = useState(null);
   const [dataOrders, setDataOrders] = useState(null);
   const [dataProducts, setDataProducts] = useState(null);
   const [dataAccess, setDataAccess] = useState(null);

   useEffect(() => {
      Promise.all([countingUsers(), countingOrders(), countingProducts()])
         .then((results) => {
            const [users, orders, products] = results;
            setDataUser(users);
            setDataOrders(orders);
            setDataProducts(products);
            setDataAccess(users);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }, []);

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
