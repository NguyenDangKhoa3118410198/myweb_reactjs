import React from 'react';

import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

function AreaChartBox({ data }) {
   return (
      <ResponsiveContainer width='100%' height='100%'>
         <AreaChart
            width={200}
            height={60}
            data={data}
            margin={{
               top: 5,
               right: 0,
               left: 0,
               bottom: 5,
            }}
         >
            <Tooltip
               contentStyle={{
                  background: 'transparent',
                  border: 'none',
               }}
               labelStyle={{ display: 'none' }}
               position={{ x: 10, y: 70 }}
               itemStyle={{
                  color: '#fff',
               }}
            />
            <Area type='monotone' dataKey='amount' stroke='#fff' fill='#fff' />
         </AreaChart>
      </ResponsiveContainer>
   );
}

export default AreaChartBox;
