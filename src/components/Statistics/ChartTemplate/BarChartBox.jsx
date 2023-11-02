import React from 'react';

import { Tooltip, ResponsiveContainer, Bar, BarChart } from 'recharts';

function BarChartBox({ data }) {
   return (
      <ResponsiveContainer width='100%' height='100%'>
         <BarChart width={150} height={40} data={data}>
            <Tooltip
               contentStyle={{
                  background: 'transparent',
                  border: 'none',
               }}
               labelStyle={{ display: 'none' }}
               position={{ x: 50, y: 0 }}
               itemStyle={{
                  color: '#fff',
               }}
               cursor={{ fill: 'transparent' }}
            />

            <Bar dataKey='amount' fill='#fff' />
         </BarChart>
      </ResponsiveContainer>
   );
}

export default BarChartBox;
