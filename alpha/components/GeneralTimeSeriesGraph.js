import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  SelectionHelpers,
} from "victory-chart";
import { VictoryLabel, Selection } from "victory-core";
import _ from "lodash";
import moment from "moment";
import { format } from "d3-format";
import Wrapper from "victory-chart/es/helpers/wrapper";
import MultiPointFlyout from "./MultiPointFlyout";
import TimeSeriesSelectionContainer from "./TimeSeriesSelectionContainer";
import DefaultDisabledTooltip from "./DefaultDisabledTooltip";
import { ensureMultipleTimes } from "../lib/utils";

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

SelectionHelpers.onMouseMove = _.throttle(
  (evt, targetProps) => {
    const { allowSelection, select } = targetProps;
    const dimension = targetProps.selectionDimension;
    if (!allowSelection || !select) {
      return {};
    }
    const { x, y } = Selection.getSVGEventCoordinates(evt);
    const chartDomain = Selection.getDomainCoordinates(targetProps);
    const x2 = dimension !== "y" ? _.clamp(x, ...chartDomain.x) : chartDomain.x[1];
    const y2 = dimension !== "x" ? _.clamp(y, ...chartDomain.y) : chartDomain.y[1];
    return {
      id: _.uniqueId("throttledEvent"),
      mutations: {
        target: "parent",
        mutation: () => ({ x2, y2 }),
      },
    };
  },
  16,
  { leading: true, trailing: false },
);

const GeneralTimeSeriesGraph = ({ yLabel, width, height, children, autoRefreshing, withTimeRange }) => (
  <VictoryChart
    width={width}
    height={height}
    padding={{ left: 50, right: 60, bottom: 50, top: 80 }}
    containerComponent={<TimeSeriesSelectionContainer
      onSelection={(points, bounds, { domain }) => {
        if (autoRefreshing && bounds.x[1] - domain.x[1] === 0) {
          withTimeRange([`now() - ${bounds.x[1] - bounds.x[0]}ms`, "now()"]);
        } else {
          withTimeRange(bounds.x.map(_.toNumber));
        }
      }}
      onSelectionCleared={
        ensureMultipleTimes(
          ({ domain, scale, mousePosition }) => {
            const centerX = (domain.x[0] + domain.x[1]) / 2;
            const currentRange = domain.x[1] - domain.x[0];
            if (centerX + currentRange > moment.now()) {
              withTimeRange([`now() - ${currentRange * 2}ms`, "now()"]);
            } else {
              withTimeRange([centerX - currentRange, centerX + currentRange]);
            }
          },
          2, // Make sure it's a double-click
          400, // Make sure the two clicks happened in-between 400 milliseconds
        )
      }
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
