import React from "react";

import { Tooltip, ResponsiveContainer, Bar, BarChart } from "recharts";

function BarChartBox({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Tooltip
          contentStyle={{
            background: "transparent",
            border: "none",
          }}
          labelStyle={{ display: "none" }}
          position={{ x: 10, y: 70 }}
          itemStyle={{
            color: "#3399ff",
          }}
          cursor={{ fill: "#fff" }}
        />

        <Bar dataKey="uv" fill="#39f" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartBox;
