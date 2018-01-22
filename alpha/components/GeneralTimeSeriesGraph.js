import React from "react";
import {
  VictoryChart,
  VictoryAxis,
} from "victory-chart";
import { VictoryLabel } from "victory-core";
import _ from "lodash";
import moment from "moment";
import { format } from "d3-format";
import Wrapper from "victory-chart/es/helpers/wrapper";
import MultiPointFlyout from "./MultiPointFlyout";
import TimeSeriesZoomContainer from "./TimeSeriesZoomContainer";
import DefaultDisabledTooltip from "./DefaultDisabledTooltip";

// Overriding Wrapper.getDomain, which is used by VictoryChart
Wrapper.getDomain = _.wrap(
  ::Wrapper.getDomain,
  (getDomain, props, axis, childComponents = React.Children.toArray(props.children)) => {
    const domain = getDomain(props, axis, childComponents);
    // Keep the threshold line in the graph even when all the data points are under threshold
    const thresholdLine = _.find(childComponents, el => _.has(el.props, "threshold"));
    if (!_.isUndefined(thresholdLine)) {
      domain[1] = _.max([domain[1], thresholdLine.props.threshold]);
    }
    return domain;
  },
);

const GeneralTimeSeriesGraph = ({ yLabel, width, height, children }) => (
  <VictoryChart
    width={width}
    height={height}
    padding={{ left: 50, right: 60, bottom: 50, top: 80 }}
    containerComponent={<TimeSeriesZoomContainer
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
