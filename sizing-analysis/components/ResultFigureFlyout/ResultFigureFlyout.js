import React, { Component } from "react";
import _ from "lodash";
import styles from "./ResultFigureFlyout.scss";


class ResultFigureFlyout extends Component {
  constructor(props) {
    super(props);
    this.width = 150;
    this.height = 300;
    this.chartWidth = 540;
    this.chartHeight = 400;
  }

  getPlacement() {
    const { x } = this.props;
    return ( x > this.chartWidth / 2 ) ? "left" : "right";
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
      this.chartHeight - this.height - 10 // Lowest y point a tooltip can be
    ]);

    // Find the middle one of the above, to avoid getting tooltips that overflows the chart area
    return orderedYPoses[1];
  }

  render() {
    const { x, y, datum } = this.props;
    const placement = this.getPlacement();
    const tooltipX = this.getTooltipXPosition();
    const tooltipY = this.getTooltipYPosition();

    return (
      <g className={styles.ResultFigureFlyout}>
        <g transform={`translate(${tooltipX},${tooltipY})`}>
          <rect rx={4} ry={4} width={150} height={300} />
          <g transform={`translate(15, 20)`}>
            <text className={styles.title}>C4.large</text>
            <text y={40} className={styles.subtitle}>Configuration</text>
            <g transform="translate(0, 65)">
              <text className={styles["property-value"]}>2</text>
              <text y={25} className={styles["property-label"]}>CPU</text>
            </g>
            <g transform="translate(0, 115)">
              <text className={styles["property-value"]}>8GB</text>
              <text y={25} className={styles["property-label"]}>Memory</text>
            </g>
            <g transform="translate(0, 165)">
              <text className={styles["property-value"]}>SSD 2x7</text>
              <text y={25} className={styles["property-label"]}>Storage</text>
            </g>
            <g transform="translate(0, 215)">
              <text className={styles["property-value"]}>Moderate</text>
              <text y={25} className={styles["property-label"]}>Network</text>
            </g>
          </g>
        </g>
        <line
          x1={ placement === "left" ? x - 10 : x + 10 }
          x2={ placement === "left" ? x - 30 : x + 30 }
          y1={ y }
          y2={ y }
          style={{ stroke: "#5677fa" }}
        />
      </g>
    );
  }
}

export default ResultFigureFlyout;
