import React, { useState, useEffect } from 'react';
import './DashboardBoxCharts.css';
// eslint-disable-next-line no-unused-vars
import { Box, LargeBox } from './Box';
import {
   // eslint-disable-next-line no-unused-vars
   data,
   InfoBox,
   DataBoxUsers,
   DataBoxOrders,
   DataBoxProducts,
} from './DataBoxes';

function DashboardBoxCharts() {
   const [dataUser, setDataUser] = useState(null);
   const [dataOrders, setDataOrders] = useState(null);
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
               <Box
                  data={dataUser}
                  chartModel={'AreaChartBox'}
                  infoBox={InfoBox[0]}
               />
            </div>
            <div className='box box2'>
               <Box
                  data={dataProducts}
                  chartModel={'LineChartBox'}
                  infoBox={InfoBox[1]}
               />
            </div>
            <div className='box box3'>
               <Box
                  data={dataOrders}
                  chartModel={'BarChartBox'}
                  infoBox={InfoBox[2]}
               />
            </div>
            <div className='box box4'>
               <Box
                  data={dataOrders}
                  chartModel={'BarChartBox'}
                  infoBox={InfoBox[2]}
               />
            </div>
            {/* <div className='box box4'>
               <LargeBox data={data} chartModel={'TotalChartBox'} />
            </div> */}
         </div>
      </div>
   );
}

export default DashboardBoxCharts;
