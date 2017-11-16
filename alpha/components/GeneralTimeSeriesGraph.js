import React from "react";
import {
  VictoryChart,
  VictoryAxis,
} from "victory-chart";
import { VictoryLabel } from "victory-core";
import moment from "moment";
import MultiPointFlyout from "./MultiPointFlyout";
import TimeSeriesTooltipContainer from "./TimeSeriesTooltipContainer";
import DefaultDisabledTooltip from "./DefaultDisabledTooltip";

const GeneralTimeSeriesGraph = ({ yLabel, children }) => {
  return (
    <VictoryChart
      width={1400}
      height={450}
      padding={{ left: 50, right: 60, bottom: 50, top: 80 }}
      style={{
        parent: { background: "#f7f9fc", border: "1px solid #e2e8fb", borderRadius: "4px" },
      }}
      containerComponent={<TimeSeriesTooltipContainer
        labelComponent={<DefaultDisabledTooltip flyoutComponent={<MultiPointFlyout />} />}
      />}
    >
      <VictoryAxis
        dependentAxis
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "#eef0fa" },
          tickLabels: { fill: "#b9bacb" },
        }}
      />
      <VictoryAxis
        tickFormat={t => moment(t).format("LTS")}
        scale="time"
        style={{
          axis: { stroke: "#b9bacb", strokeWidth: "2px" },
          tickLabels: { fill: "#b9bacb" },
        }}
        tickCount={10}
      />
      <VictoryLabel
        text={yLabel}
        style={{ fill: "#606175", fontSize: "16px" }}
        x={15}
        y={30}
      />
      { children }
    </VictoryChart>
  );
};

export default GeneralTimeSeriesGraph;
