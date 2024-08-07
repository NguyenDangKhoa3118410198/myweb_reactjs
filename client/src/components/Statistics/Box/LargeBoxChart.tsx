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

interface ILargeBoxChart {
   data?: any;
   chartModel: string;
   title?: string;
}

const LargeBoxChart: React.FC<ILargeBoxChart> = ({
   data,
   chartModel,
   title,
}) => {
   const chartComponents: { [key: string]: React.ElementType } = {
      AreaChartBox: AreaChart,
      LineChartBox: LineChart,
      BarChartBox: BarChart,
      TotalChartBox: TotalChart,
      PieChartBox: PieChart,
      RadialBarChartBox: RadialBarChart,
   };

   const ChartComponent = chartComponents[chartModel] || null;

   const getDate = () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${month}/ ${year}`;
   };

   return (
      <div className='large-box-chart'>
         <div className='large-box-chart-info'>
            <div className='large-box-chart-title'>
               <h3 className='large-box-title'>{title ? title : getDate()}</h3>
            </div>
         </div>

         <div className='large-box-chart-content'>
            <div className='large-shape-chart'>
               {ChartComponent && <ChartComponent data={data} />}
            </div>
         </div>
      </div>
   );
};

export default LargeBoxChart;
