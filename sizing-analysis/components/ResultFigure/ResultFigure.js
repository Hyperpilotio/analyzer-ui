import React, { Component } from "react";
import _ from "lodash";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  createContainer
} from "victory-chart";
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


class VictoryLineWithoutPoints extends VictoryLine {
  static getData = () => null;
}

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
      domainPadding={{
        x: [50, 50],
        y: [50, 50]
      }}
    >
      <VictoryAxis dependentAxis style={{
        axis: {
          strokeWidth: 5,
          stroke: "#5677fa"
        }
      }} />
      <VictoryAxis style={{
        axis: {
          strokeWidth: 5,
          stroke: "#5677fa"
        }
      }} />
      <VictoryScatter
        data={reshapeData(data, instancesData)}
        groupComponent={<g transform="translate(20, 0)" />}
        size={10}
        style={{ data: { strokeWidth: 2 } }}
      />
    </VictoryChart>
  </div>
);

export default ResultFigure;
