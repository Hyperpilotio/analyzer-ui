import React, { Component } from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryTooltip,
  createContainer
} from "victory";
import _ from "lodash";
import styles from "./ResultFigure.scss";


const WIDTH = 540;
const HEIGHT = 400;

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

const pointStyles = {
  maxPerfOverCost: { fill: "#5677fa", stroke: "#ffffff" },
  maxPerfWithCostLimit: { fill: "#eef0fa", stroke: "#5677fa" },
  minCostWithPerfLimit: { fill: "#daf9b8", stroke: "#b8e986" },
  notSelected: { fill: "#b9bacb", stroke: "#ffffff" }
};

class VictoryLineWithoutPoints extends VictoryLine {
  static getData = () => null;
}

class ResultFigureFlyout extends Component {
  constructor(props) {
    super(props);
    this.width = 150;
    this.height = 300;
  }

  getPlacement() {
    const { x } = this.props;
    return ( x > WIDTH / 2 ) ? "left" : "right";
  }

  getTooltipXPosition() {
    const { x } = this.props;
    // Show the tooltip on the left side if the point is on the right part
    if ( this.getPlacement() === "left" ) {
      return x - this.width - 30;
    } else {
      return x + 30;
    }
  }

  getTooltipYPosition() {
    const { y } = this.props;
    const orderedYPoses = _.sortBy([
      10, // Highest y point a tooltip can be
      y - this.height / 2, // The y point where the tooltip should be
      HEIGHT - this.height - 10 // Lowest y point a tooltip can be
    ]);

    // Find the middle one of the above, to avoid getting tooltips that overflows the chart area
    return orderedYPoses[1];
  }

  render() {
    const { x, y, datum } = this.props;
    // console.log(this.props);
    const placement = this.getPlacement();
    return (
      <g>
        <rect
          x={ this.getTooltipXPosition() }
          y={ this.getTooltipYPosition() }
          rx={4}
          ry={4}
          width={150} height={300}
          style={{
            stroke: "#5677fa",
            fill: "rgba(140, 177, 250, 0.05)"
          }}
        />
        <line
          x1={ placement === "left" ? x - 10 : x + 10 }
          x2={ placement === "left" ? x - 30 : x + 30 }
          y1={ y }
          y2={ y }
          style={{
            stroke: "#5677fa"
          }}
        />
      </g>
    );
  }
}

const ResultFigure = ({ className }) => (
  <div className={`${styles.ResultFigure} ${className}`}>
    <VictoryChart
      containerComponent={ <VictoryZoomVoronoiContainer
        labels={d => `${d.x}, ${d.y}`}
        labelComponent={ <VictoryTooltip flyoutComponent={ <ResultFigureFlyout /> } /> }
      /> }
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
          { x: 2442.24, y: 1920000, ...pointStyles.notSelected },
          { x: 3538.08, y: 1920000, ...pointStyles.notSelected },
          { x: 1234.08, y: 1920000, ...pointStyles.notSelected },
          { x: 2315.52, y: 2160000, ...pointStyles.notSelected },
          { x: 967.68, y: 1920000, ...pointStyles.notSelected },
          { x: 356.832, y: 960000, ...pointStyles.notSelected },
          { x: 1216.08, y: 1920000, ...pointStyles.notSelected },
          { x: 1120.392, y: 1920000, ...pointStyles.notSelected },
          { x: 362.88, y: 960000, ...pointStyles.notSelected },
          { x: 892.08, y: 2400000, ...pointStyles.notSelected },
          { x: 2959.2, y: 3840000, ...pointStyles.notSelected },
          { x: 289.44, y: 240000, ...pointStyles.notSelected },
          { x: 273.6, y: 480000, ...pointStyles.maxPerfWithCostLimit },
          { x: 241.92, y: 480000, ...pointStyles.minCostWithPerfLimit },
          { x: 725.76, y: 2160000, ...pointStyles.maxPerfOverCost },
        ]}
        size={10}
        style={{
          data: { strokeWidth: 2 },
          labels: { fill: "none" }
        }}
      />
    </VictoryChart>
  </div>
);

export default ResultFigure;
