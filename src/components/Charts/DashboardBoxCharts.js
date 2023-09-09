import React from "react";

import "./DashboardBoxCharts.css";
import { Box, LargeBox } from "./Box";
import { data, InfoBox } from "./DataBoxes";

function DashboardBoxCharts() {
  return (
    <div className="container">
      <div className="grid-container">
        <div className="box box1">
          <Box data={data} chartModel={"AreaChartBox"} infoBox={InfoBox[0]} />
        </div>
        <div className="box box2">
          <Box data={data} chartModel={"LineChartBox"} infoBox={InfoBox[1]} />
        </div>
        <div className="box box3">
          <Box data={data} chartModel={"BarChartBox"} infoBox={InfoBox[2]} />
        </div>
        <div className="box box4">
          <LargeBox data={data} chartModel={"TotalChartBox"} />
        </div>
      </div>
    </div>
  );
}

export default DashboardBoxCharts;
