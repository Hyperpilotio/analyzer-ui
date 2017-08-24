import React, { Component } from "react";
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

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

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

class VictoryLineWithoutPoints extends VictoryLine {
  static getData = () => null;
}

VictoryLabel.getData = () => null;

const reshapeData = (data, instancesData) => {
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
      // Get the instance details from this fixed dataset
      // which we should change later
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
};

const ResultFigure = ({ className, data, instancesData }) => (
  <div className={`${styles.ResultFigure} ${className}`}>
    <VictoryChart
      containerComponent={ <VictoryZoomVoronoiContainer
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
        data={reshapeData(data, instancesData)}
        groupComponent={<g transform="translate(20, 0)" />}
        size={10}
        style={{ data: chartStyles.dataPoint }}
      />
    </VictoryChart>
  </div>
);

      // <VictoryLabel x={WIDTH - 35} y={HEIGHT - 15} style={{ fill: "#b9bacb" }} text="1400" />
      // <VictoryLabel angle={90} x={15} y={10} style={{ fill: "#b9bacb" }} text="22000" />
export default ResultFigure;
