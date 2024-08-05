import React from 'react';
import { AreaChart, LineChart, BarChart } from '../ChartTemplate';
import '../DashboardBoxCharts';

interface IBoxChart {
   data: any;
   chartModel: string;
   infoBox: {
      icon: React.ReactNode;
      title: string;
   };
}

const BoxChart: React.FC<IBoxChart> = ({ data, chartModel, infoBox }) => {
   const chartComponents: { [key: string]: React.ElementType } = {
      AreaChartBox: AreaChart,
      LineChartBox: LineChart,
      BarChartBox: BarChart,
   };

   const ChartComponent = chartComponents[chartModel] || null;

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
            <div className='shape-chart'>
               {ChartComponent && <ChartComponent data={data} />}
            </div>
         </div>
      </div>
   );
};

export default BoxChart;
