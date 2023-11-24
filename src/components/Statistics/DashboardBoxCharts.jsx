import React, { useState, useEffect } from 'react';
import './dashboardBoxCharts.css';
// eslint-disable-next-line no-unused-vars
import { Box, LargeBox } from './Box';
import Cart from './Carts/Card';
import {
   // eslint-disable-next-line no-unused-vars
   data,
   infoCard,
   DataBoxUsers,
   DataBoxOrders,
   DataBoxProducts,
} from './DataBoxes';

function DashboardBoxCharts() {
   // eslint-disable-next-line no-unused-vars
   const [dataUser, setDataUser] = useState(null);
   // eslint-disable-next-line no-unused-vars
   const [dataOrders, setDataOrders] = useState(null);
   // eslint-disable-next-line no-unused-vars
   const [dataProducts, setDataProducts] = useState(null);

   useEffect(() => {
      Promise.all([DataBoxUsers(), DataBoxOrders(), DataBoxProducts()])
         .then((results) => {
            const [boxUsers, boxOrders, boxProducts] = results;
            setDataUser(boxUsers.flat());
            setDataOrders(boxOrders.flat());
            setDataProducts(boxProducts.flat());
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }, []);

   return (
      <div className='dashboard-charts-box-container'>
         <div className='dashboard-grid-container'>
            <div className='box box1'>
               <Cart infoCard={infoCard[0]} />
            </div>
            <div className='box box2'>
               <Cart infoCard={infoCard[1]} />
            </div>
            <div className='box box3'>
               <Cart infoCard={infoCard[2]} />
            </div>
            <div className='box box4'>
               <Cart infoCard={infoCard[3]} />
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
