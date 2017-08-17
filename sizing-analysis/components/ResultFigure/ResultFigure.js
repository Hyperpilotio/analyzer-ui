import React from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryZoomContainer
} from "victory";
import styles from "./ResultFigure.scss";
import { connect } from 'react-redux';
import { mapStateToProps } from "../../actions";


const WIDTH = 540;
const HEIGHT = 400;

const ResultFigure = ({ selected_apps, className, id }) => {
  let selected_app;

  for(let app of selected_apps){
    if(id === app.appId){
       selected_app = app;
       break;
    }
  }
  let optimal;
  let highPerf;
  let lowCost;
  let budget;
  let otherTests = [];

  if(!!selected_app){
    budget = selected_app.budget;
    if(!!selected_app.sizingRuns){
      for(let sizingRun of selected_app.sizingRuns){
        for(let test of sizingRun.results){
          otherTests.push(test);
        }
      }
    }
  if(!!selected_app.recommendations){
    for(let result of selected_app.recommendations){
       switch(result.objective){
         case "MaxPerfOverCost":
            highPerf = result;
            break;
         case "MinCostWithPerfLimit":
            lowCost = result;
            break;
         case "MaxPerfWithCostLimit":
            optimal = result;
            break;
       }
    }
  }
  }
  return (
  <div className={`${styles.ResultFigure} ${className}`}>
    <VictoryChart
      containerComponent={ <VictoryZoomContainer /> }
      padding={0}
      width={WIDTH}
      height={HEIGHT}
      domainPadding={{
        x: [50, 50],
        y: [50, 50]
      }}
    >
      <VictoryLine
        y={() => 50000}
        style={{
          data: {
            strokeWidth: 1,
            stroke: "#8cb1fa",
            strokeDasharray: "5, 5"
          }
        }}
      />
      <VictoryLine
        x={() => 300}
        style={{
          data: {
            strokeWidth: 1,
            stroke: "#ff8686",
            strokeDasharray: "5, 5"
          }
        }}
      />
      <VictoryAxis dependentAxis style={{
        axis: {
          strokeWidth: 5,
          stroke: "#5677fa"
        },
        grid: {
          stroke: "#eef0fa"
        }
      }} />
      <VictoryAxis style={{
        axis: {
          strokeWidth: 5,
          stroke: "#5677fa"
        }
      }} />
      <VictoryScatter
        data={[
          { x: 2442.24, y: 1920000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 3538.08, y: 1920000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 1234.08, y: 1920000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 2315.52, y: 2160000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 967.68, y: 1920000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 356.832, y: 960000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 1216.08, y: 1920000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 1120.392, y: 1920000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 362.88, y: 960000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 892.08, y: 2400000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 2959.2, y: 3840000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 289.44, y: 240000, fill: "#b9bacb", stroke: "#ffffff" },
          { x: 273.6, y: 480000, fill: "#eef0fa", stroke: "#5677fa" }, //high performance
          { x: 241.92, y: 480000, fill: "#daf9b8", stroke: "#b8e986" }, //low cost
          { x: 725.76, y: 2160000, fill: "#5677fa", stroke: "#ffffff" }, //optimal
        ]}
        size={10}
        style={{ data: { strokeWidth: 2 } }}
      />
    </VictoryChart>
  </div>
)};

export default connect(mapStateToProps)(ResultFigure);