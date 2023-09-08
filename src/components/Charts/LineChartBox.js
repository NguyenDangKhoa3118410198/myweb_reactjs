import React from "react";

import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

function LineChartBox({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={100} height={100} data={data}>
        <Tooltip
          contentStyle={{
            background: "transparent",
            border: "none",
          }}
          labelStyle={{ display: "none" }}
          position={{ x: 50, y: 80 }}
          itemStyle={{
            color: "#fff",
          }}
        />
        <Line type="monotone" dataKey="pv" stroke="#fff " strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartBox;
