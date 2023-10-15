import React from 'react';
import { AreaChart, LineChart, BarChart } from '../ChartTemplate';
import '../DashboardBoxCharts';

function BoxChart({ data, chartModel, infoBox }) {
   const chartComponents = {
      AreaChartBox: <AreaChart data={data} />,
      LineChartBox: <LineChart data={data} />,
      BarChartBox: <BarChart data={data} />,
   };
   const selectedChart = chartComponents[chartModel] || null;
   return (
      <div className='box-chart-container'>
         <div className='box-info'>
            <div className='box-chart-title'>
               {infoBox.icon}
               {infoBox.title}
            </div>
            <h1 className='box-chart-quanlity'>10</h1>
            <p>View All</p>
         </div>
         <div className='box-chart-info'>
            <div className='shape-chart'>{selectedChart}</div>
         </div>
      </div>
   );
}

export default BoxChart;
