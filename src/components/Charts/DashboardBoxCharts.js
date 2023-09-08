import React from "react";

import "./DashboardBoxCharts.css";
import BoxChart from "./Box/BoxChart";
import LargeBoxChart from "./Box/LargeBoxChart";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dataBoxes = ["Customers", "Products", "Orders"];

function DashboardBoxCharts() {
  return (
    <div className="container">
      <div className="grid-container">
        <div className="box box1">
          <BoxChart
            data={data}
            chartModel={"AreaChartBox"}
            dataBoxes={dataBoxes[0]}
          />
        </div>
        <div className="box box2">
          <BoxChart
            data={data}
            chartModel={"LineChartBox"}
            dataBoxes={dataBoxes[1]}
          />
        </div>
        <div className="box box3">
          <BoxChart
            data={data}
            chartModel={"BarChartBox"}
            dataBoxes={dataBoxes[2]}
          />
        </div>
        <div className="box box4">
          <LargeBoxChart data={data} chartModel={"TotalChartBox"} />
        </div>
      </div>
    </div>
  );
}

export default DashboardBoxCharts;
