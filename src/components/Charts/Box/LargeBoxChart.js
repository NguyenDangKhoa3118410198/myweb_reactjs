import React from "react";
import AreaChartBox from "../AreaChartBox";
import LineChartBox from "../LineChartBox";
import BarChartBox from "../BarChartBox";
import TotalChartBox from "../TotalChartBox";

import "../DashboardBoxCharts";

function LargeBoxChart({ data, chartModel, dataBoxes }) {
  const chartComponents = {
    AreaChartBox: <AreaChartBox data={data} />,
    LineChartBox: <LineChartBox data={data} />,
    BarChartBox: <BarChartBox data={data} />,
    TotalChartBox: <TotalChartBox data={data} />,
  };

  const selectedChart = chartComponents[chartModel] || null;
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return (
    <div className="largeBox">
      <div className="largeBoxInfo">
        <div className="title">
          <h3>{`Date : ${month}/${year}`}</h3>
        </div>
      </div>

      <div className="largeChartBox">
        <div className="largechart">{selectedChart}</div>
      </div>
    </div>
  );
}

export default LargeBoxChart;
