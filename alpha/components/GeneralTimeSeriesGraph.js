import React from "react";
import {
  VictoryChart,
  VictoryAxis,
} from "victory-chart";
import { VictoryLabel } from "victory-core";
import _ from "lodash";
import moment from "moment";
import { format } from "d3-format";
import MultiPointFlyout from "./MultiPointFlyout";
import TimeSeriesTooltipContainer from "./TimeSeriesTooltipContainer";
import DefaultDisabledTooltip from "./DefaultDisabledTooltip";

const GeneralTimeSeriesGraph = ({ yLabel, width, height, children }) => (
  <VictoryChart
    width={width}
    height={height}
    padding={{ left: 50, right: 60, bottom: 50, top: 80 }}
    containerComponent={<TimeSeriesTooltipContainer
      labelComponent={<DefaultDisabledTooltip flyoutComponent={<MultiPointFlyout />} />}
    />}
  >
    <VictoryAxis
      dependentAxis
      tickFormat={_.cond([
        [x => x < 4, format(".2f")],
        [x => x < 1000, format("d")],
        [_.stubTrue, format(".2s")],
      ])}
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

GeneralTimeSeriesGraph.defaultProps = {
  width: 1400,
  height: 400,
};

export default GeneralTimeSeriesGraph;
