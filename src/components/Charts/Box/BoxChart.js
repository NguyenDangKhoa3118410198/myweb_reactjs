import React from "react";
import AreaChartBox from "../AreaChartBox";
import LineChartBox from "../LineChartBox";
import BarChartBox from "../BarChartBox";

function BoxChart({ data, chartModel }) {
  const chartComponents = {
    AreaChartBox: <AreaChartBox data={data} />,
    LineChartBox: <LineChartBox data={data} />,
    BarChartBox: <BarChartBox data={data} />,
  };
  const selectedChart = chartComponents[chartModel] || null;
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">Users</div>
        <h1>10</h1>
        <p>View All</p>
      </div>
      <div className="chartInfo">
        <div className="chart">{selectedChart}</div>
        <div className="texts">
          <span className="percentage">45%</span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
}

export default BoxChart;
