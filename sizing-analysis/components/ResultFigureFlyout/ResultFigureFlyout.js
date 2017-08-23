import React, { Component } from "react";
import _ from "lodash";
import styles from "./ResultFigureFlyout.scss";


const InstanceConfig = ({ label, value, ...props }) => (
  <g {...props}>
    <text className={styles["property-label"]}>{ label }</text>
    <text y={15} className={styles["property-value"]} style={{ width: "50%" }}>{ value }</text>
  </g>
);


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
          <rect
            className={styles.background} rx={4} ry={4} width={160} height={280}
          />
          <rect
            className={styles.box} rx={4} ry={4} width={160} height={280}
          />
          <g transform={`translate(15, 20)`}>
            <text className={styles.title}>
              { datum.instance.name }
            </text>

            <InstanceConfig
              transform="translate(0, 55)"
              label="CPU"
              value={ datum.instance.cpu }
            />
            <InstanceConfig
              transform="translate(0, 105)"
              label="Memory"
              value={ datum.instance.memory }
            />
            <InstanceConfig
              transform="translate(0, 155)"
              label="Storage"
              value={ datum.instance.storage }
            />
            <InstanceConfig
              transform="translate(0, 205)"
              label="Network"
              value={ datum.instance.network }
            />
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
