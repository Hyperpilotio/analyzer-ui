import React from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis
} from "victory";
import styles from "./ResultFigure.scss";

const WIDTH = 540;
const HEIGHT = 400;

const ResultFigure = ({ className }) => (
  <div className={`${styles.ResultFigure} ${className}`}>
    <VictoryChart
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
          {
            x: 230.78,
            y: 600,
            fill: "#5677fa",
            stroke: "ffffff"
          },
          {
            x: 250.43,
            y: 680,
            fill: "#eef0fa",
            stroke: "#5677fa"
          },
          {
            x: 160.25,
            y: 270,
            fill: "#daf9b8",
            stroke: "#b8e986"
          }
        ]}
        size={10}
        style={{ data: { strokeWidth: 2 } }}
      />
    </VictoryChart>
  </div>
);
export default ResultFigure;
