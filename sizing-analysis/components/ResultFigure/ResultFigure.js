import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  createContainer
} from "victory-chart";
import { VictoryLabel } from "victory-core";
import { VictoryTooltip } from "victory-core";
import ResultFigureFlyout from "../ResultFigureFlyout";
import styles from "./ResultFigure.scss";


const WIDTH = 540;
const HEIGHT = 400;

const pointStyles = {
  MaxPerfOverCost: { fill: "#5677fa", stroke: "#ffffff" },
  // MaxPerfWithCostLimit: { fill: "#eef0fa", stroke: "#5677fa" },
  // MinCostWithPerfLimit: { fill: "#daf9b8", stroke: "#b8e986" },
  MaxPerfWithCostLimit: { fill: "#b9bacb", stroke: "#ffffff" },
  MinCostWithPerfLimit: { fill: "#b9bacb", stroke: "#ffffff" },
  NotRecommended: { fill: "#b9bacb", stroke: "#ffffff" }
};

const chartStyles = {
  axis: {
    strokeWidth: 5,
    stroke: "#5677fa"
  },
  gridLine: {
    stroke: "#eef0fa"
  },
  tickValue: {
    fontSize: 12,
    fill: "transparent",
    stroke: "#b9bacb",
    strokeWidth: 0.5,
    fontWeight: "lighter"
  },
  dataPoint: {
    strokeWidth: 2
  }
};

VictoryLine.getData = () => null;
VictoryLabel.getData = () => null;


class VictoryZoomVoronoiContainer extends createContainer("zoom", "voronoi") {
  static contextTypes = {
    highlightedInstance: PropTypes.string,
    data: PropTypes.array
  }

  getChildren(props) {
    const activePoints = _
      .filter(
        this.context.data,
        { instance: { name: this.context.highlightedInstance } }
      )
      .map(
        tooltipArgs => ({
          ...tooltipArgs,
          _x: tooltipArgs.x,
          _y: tooltipArgs.y
        })
      );

    return super.getChildren({ ...props, activePoints });
  }
}


class ResultFigure extends Component {

  static childContextTypes = VictoryZoomVoronoiContainer.contextTypes

  constructor(props) {
    super(props);
    this.data = this.reshapeData(props.data, props.instancesData);
  }

  componentWillReceiveProps(props) {
    if (!_.isEqual(props.data, this.props.data)) {
      this.data = this.reshapeData(props.data, props.instancesData);
    }
  }

  getChildContext() {
    return {
      highlightedInstance: this.props.highlightedInstance,
      data: this.data
    };
  }

  reshapeData(data, instancesData) {
    if (!data) { return []; }
    // Flatten the batch runs data
    const runResults = _.concat(..._.map(data.sizingRuns, "results"));
    return runResults
      // Make recommended instances have higher z-index
      // (but there's no z-index in SVG so just draw the lower ones first)
      .filter(result => (
        !_.includes(_.map(data.recommendations, "nodetype"), result.nodetype)
      ))
      // Filter out results of unavailable machines
      .filter(result => result.qosValue !== 0)
      // Draw non-recommended instances
      .map(({ qosValue, cost, nodetype }) => ({
        x: cost,
        y: qosValue,
        instance: _.find(instancesData, { name: nodetype }),
        ...pointStyles.NotRecommended
      }))
      // Then draw the recommended instances
      .concat(
        data.recommendations.map(({ nodetype, objective }) => {
          const runResult = _.find(runResults, { nodetype });
          return {
            x: runResult.cost,
            y: runResult.qosValue,
            instance: _.find(instancesData, { name: nodetype }),
            ...pointStyles[objective]
          };
        })
      );
  }

  render() {
    const { className, data, instancesData, onHighlight } = this.props;

    return <div className={`${styles.ResultFigure} ${className}`}>
      <VictoryChart
        containerComponent={ <VictoryZoomVoronoiContainer
          onActivated={( [point] ) => onHighlight(point.instance.name)}
          labels={d => ""}
          labelComponent={
            <VictoryTooltip flyoutComponent={ <ResultFigureFlyout /> } />
          }
        /> }
        padding={0}
        width={WIDTH}
        height={HEIGHT}
        domain={{
          x: [0, 1400],
          y: [0, 22000]
        }}
      >
        <VictoryAxis
          dependentAxis
          tickCount={4}
          style={{ axis: chartStyles.axis, grid: chartStyles.gridLine }}
          tickLabelComponent={
            <VictoryLabel
              textAnchor="start"
              verticalAnchor="end"
              dx={17}
              dy={-5}
              style={ chartStyles.tickValue }
            />
          }
        />
        <VictoryAxis
          tickCount={4}
          style={{ axis: chartStyles.axis, grid: chartStyles.gridLine }}
          tickLabelComponent={
            <VictoryLabel
              textAnchor="start"
              verticalAnchor="end"
              dx={5}
              dy={-17}
              style={ chartStyles.tickValue }
            />
          }
        />
        <VictoryScatter
          ref={this.saveScatterRef}
          data={this.reshapeData(data, instancesData)}
          groupComponent={<g transform="translate(20, 0)" />}
          size={10}
          style={{ data: chartStyles.dataPoint }}
        />
      </VictoryChart>
    </div>;
  }

}

export default ResultFigure;
