import React from 'react';
import {
   AreaChart,
   LineChart,
   BarChart,
   TotalChart,
   PieChart,
   RadialBarChart,
} from '../ChartTemplate';
import '../DashboardBoxCharts';

function LargeBoxChart({ data, chartModel }) {
   const chartComponents = {
      AreaChartBox: <AreaChart data={data} />,
      LineChartBox: <LineChart data={data} />,
      BarChartBox: <BarChart data={data} />,
      TotalChartBox: <TotalChart data={data} />,
      PieChartBox: <PieChart data={data} />,
      RadialBarChartBox: <RadialBarChart data={data} />,
   };

   const selectedChart = chartComponents[chartModel] || null;

   const getDate = () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${month}/${year}`;
   };

   return (
      <div className='largeBox'>
         <div className='largeBoxInfo'>
            <div className='title'>
               <h3>{getDate()}</h3>
            </div>
         </div>

         <div className='largeChartBox'>
            <div className='largechart'>{selectedChart}</div>
         </div>
      </div>
   );
}

export default LargeBoxChart;
