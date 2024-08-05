import React from 'react';
import {
   ResponsiveContainer,
   ComposedChart,
   Line,
   Area,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
} from 'recharts';

interface ITotalChart {
   data: any;
}

const TotalChart: React.FC<ITotalChart> = ({ data }) => {
   return (
      <ResponsiveContainer>
         <ComposedChart
            width={500}
            height={380}
            data={data}
            margin={{
               top: 10,
               right: 10,
               left: 10,
               bottom: 45,
            }}
         >
            <CartesianGrid stroke='#f5f5f5' />
            <XAxis dataKey='name' scale='band' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
               type='monotone'
               dataKey='amt'
               fill='#8884d8'
               stroke='#8884d8'
            />
            <Bar dataKey='pv' barSize={20} fill='#413ea0' />
            <Line type='monotone' dataKey='uv' stroke='#ff7300' />
         </ComposedChart>
      </ResponsiveContainer>
   );
};

export default TotalChart;
