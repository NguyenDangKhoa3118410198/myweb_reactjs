import React from "react";
import { AreaChart, LineChart, BarChart } from "../ChartTemplate";
import "../DashboardBoxCharts";

function BoxChart({ data, chartModel, dataBoxes }) {
  const chartComponents = {
    AreaChartBox: <AreaChart data={data} />,
    LineChartBox: <LineChart data={data} />,
    BarChartBox: <BarChart data={data} />,
  };
  const selectedChart = chartComponents[chartModel] || null;

  return (
    <div className="containerBox">
      <div className="boxInfo">
        <div className="title">{dataBoxes}</div>
        <h1>10</h1>
        <p>View All</p>
      </div>
      <div className="chartInfo">
        <div className="chart">{selectedChart}</div>
      </div>
    </div>
  );
}

export default BoxChart;
