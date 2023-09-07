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
          position={{ x: 10, y: 60 }}
          itemStyle={{
            color: "#3399ff",
          }}
        />
        <Line type="monotone" dataKey="pv" stroke="#0d6efd" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartBox;
