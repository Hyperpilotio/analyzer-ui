import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  SelectionHelpers,
} from "victory-chart";
import { VictoryLabel, Selection } from "victory-core";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import { format } from "d3-format";
import Wrapper from "victory-chart/es/helpers/wrapper";
import MultiPointFlyout from "./MultiPointFlyout";
import TimeSeriesSelectionContainer from "./TimeSeriesSelectionContainer";
import DefaultPreventedTooltip from "./DefaultPreventedTooltip";
import { ensureMultipleTimes } from "../lib/utils";


// Overriding and extending Wrapper.getDomain, which is used by VictoryChart
Wrapper.getDomain = _.wrap(
  // Original function: https://github.com/FormidableLabs/victory-chart/blob/138a974af346929b93201daaa049b10666ee1619/src/helpers/wrapper.js#L36-L54
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

// Overriding SelectionHelpers.onMouseMove: https://github.com/FormidableLabs/victory-chart/blob/138a974af346929b93201daaa049b10666ee1619/src/components/containers/selection-helpers.js#L98-L114
SelectionHelpers.onMouseMove = _.throttle(
  (evt, targetProps) => {
    // Contents copied from the original function
    const { allowSelection, select } = targetProps;
    const dimension = targetProps.selectionDimension;
    if (!allowSelection || !select) {
      return {};
    }
    const { x, y } = Selection.getSVGEventCoordinates(evt);
    const chartDomain = Selection.getDomainCoordinates(targetProps);
    // Make sure the selection is capped with the chart domain
    const x2 = dimension !== "y" ? _.clamp(x, ...chartDomain.x) : chartDomain.x[1];
    const y2 = dimension !== "x" ? _.clamp(y, ...chartDomain.y) : chartDomain.y[1];
    return {
      // Do what victory-chart's `attachId` helper does: https://github.com/FormidableLabs/victory-chart/blob/138a974af346929b93201daaa049b10666ee1619/src/helpers/event-handlers.js#L3-L8
      id: _.uniqueId("throttledEvent"),
      mutations: {
        target: "parent",
        mutation: () => ({ x2, y2 }),
      },
    };
  },
  // The following parameters for _.throttle are copied from https://github.com/FormidableLabs/victory-chart/blob/138a974af346929b93201daaa049b10666ee1619/src/components/containers/selection-helpers.js#L158-L162
  16,
  { leading: true, trailing: false },
);

const GeneralTimeSeriesGraph = ({
  yLabel, width, height, children, autoRefreshing, withTimeRange,
}) => (
  <VictoryChart
    width={width}
    height={height}
    padding={{ left: 50, right: 60, bottom: 50, top: 80 }}
    containerComponent={<TimeSeriesSelectionContainer
      // onSelection should set the time range of the influx query
      onSelection={(points, bounds, { domain }) => {
        // Keep it auto-refreshing if the area user selects reaches the domain's right end,
        // (using non-number values will make it auto-refreshing, e.g. "now() - 5m",
        // see withInfluxData)
        if (autoRefreshing && bounds.x[1] - domain.x[1] === 0) {
          withTimeRange([`now() - ${bounds.x[1] - bounds.x[0]}ms`, "now()"]);
        } else {
          // Or just a normal time range with two timestamps
          withTimeRange(bounds.x.map(_.toNumber));
        }
      }}
      onSelectionCleared={
        ensureMultipleTimes(
          ({ domain }) => {
            const xDomain = _.map(domain.x, _.toNumber);
            const centerX = (xDomain[0] + xDomain[1]) / 2;
            const currentRange = xDomain[1] - xDomain[0];
            // Make sure the adjusted domain doesn't exceed the current time
            if (centerX + currentRange > moment.now()) {
              withTimeRange([`now() - ${currentRange * 2}ms`, "now()"]);
            } else {
              withTimeRange([centerX - currentRange, centerX + currentRange]);
            }
          },
          2, // Make sure it's a double-click
          400, // Make sure the two clicks happened within 400 milliseconds
        )
      }
      labelComponent={<DefaultPreventedTooltip flyoutComponent={<MultiPointFlyout />} />}
    />}
  >
    {/* Axis Y */}
    <VictoryAxis
      dependentAxis
      tickFormat={100}
      style={{
        axis: { stroke: "none" },
        grid: { stroke: "#eef0fa" },
        tickLabels: { fill: "#b9bacb" },
      }}
    />
    {/* Axis X */}
    <VictoryAxis
      tickFormat={t => moment(t).format("MM/DD")}
      scale="time"
      style={{
        axis: { stroke: "#b9bacb", strokeWidth: "2px" },
        tickLabels: { fill: "#b9bacb" },
      }}
      tickCount={10}
    />
    <VictoryLabel
      text="cores"
      style={{ fill: "#606175", fontSize: "16px" }}
      x={15}
      y={30}
    />
    { _.isEmpty(React.Children.toArray(children).filter(child => child.props.isData)) ?
      <VictoryLabel x={(width / 2) - 60} y={height / 2} text="No data points found" /> : null
    }
    { children }
  </VictoryChart>
);

GeneralTimeSeriesGraph.propTypes = {
  yLabel: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node.isRequired,
  // autoRefreshing indicates whether if the chart is set up to refresh for every certain interval
  autoRefreshing: PropTypes.bool,
  withTimeRange: PropTypes.func.isRequired,
};

GeneralTimeSeriesGraph.defaultProps = {
  yLabel: "",
  width: 1400,
  height: 400,
  autoRefreshing: false,
};

export default GeneralTimeSeriesGraph;
