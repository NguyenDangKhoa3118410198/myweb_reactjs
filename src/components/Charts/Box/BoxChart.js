import React from "react";
import AreaChartBox from "../AreaChartBox";
import LineChartBox from "../LineChartBox";
import BarChartBox from "../BarChartBox";
import "../DashboardBoxCharts";

function BoxChart({ data, chartModel, dataBoxes }) {
  const chartComponents = {
    AreaChartBox: <AreaChartBox data={data} />,
    LineChartBox: <LineChartBox data={data} />,
    BarChartBox: <BarChartBox data={data} />,
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
