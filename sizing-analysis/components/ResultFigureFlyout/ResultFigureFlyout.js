import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import styles from "./ResultFigureFlyout.scss";


const InstanceConfig = ({ label, value, ...props }) => (
  <g {...props}>
    <text className={styles["property-label"]}>{ label }</text>
    <text y={15} className={styles["property-value"]} style={{ width: "50%" }}>{ value }</text>
  </g>
);

InstanceConfig.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};


class ResultFigureFlyout extends Component {
  constructor(props) {
    super(props);
    this.width = 160;
    this.height = 280;
    this.chartWidth = 540;
    this.chartHeight = 400;
  }

  getPlacement() {
    const x = this.props.datum.posX;
    return (x > this.chartWidth / 2) ? "left" : "right";
  }

  getTooltipXPosition() {
    const x = this.props.datum.posX;
    // Show the tooltip on the left side if the point is on the right part
    if (this.getPlacement() === "left") {
      return x - this.width - 30;
    }
    return x + 30;
  }

  getTooltipYPosition() {
    const y = this.props.datum.posY;
    const orderedYPoses = _.sortBy([
      5, // Highest y point a tooltip can be
      y - (this.height / 2), // The y point where the tooltip should be
      this.chartHeight - this.height - 5, // Lowest y point a tooltip can be
    ]);

    // Find the middle one of the above, to avoid getting tooltips that overflows the chart area
    return orderedYPoses[1];
  }

  render() {
    const { datum: { instance, posX, posY } } = this.props;
    const placement = this.getPlacement();
    const tooltipX = this.getTooltipXPosition();
    const tooltipY = this.getTooltipYPosition();

    const containerElement = <rect rx={4} ry={4} width={this.width} height={this.height} />;

    return (
      <g transform="translate(20, 0)" className={styles.ResultFigureFlyout}>
        <g transform={`translate(${tooltipX},${tooltipY})`}>
          { React.cloneElement(containerElement, { className: styles.background }) }
          { React.cloneElement(containerElement, { className: styles.box }) }
          <g transform={"translate(15, 20)"}>
            <text className={styles.title}>
              { instance.name }
            </text>

            <InstanceConfig
              transform="translate(0, 55)"
              label="CPU"
              value={instance.cpu}
            />
            <InstanceConfig
              transform="translate(0, 105)"
              label="Memory"
              value={instance.memory}
            />
            <InstanceConfig
              transform="translate(0, 155)"
              label="Storage"
              value={instance.storage}
            />
            <InstanceConfig
              transform="translate(0, 205)"
              label="Network"
              value={instance.network}
            />
          </g>
        </g>
        <line
          x1={placement === "left" ? posX - 10 : posX + 10}
          x2={placement === "left" ? posX - 30 : posX + 30}
          y1={posY}
          y2={posY}
          style={{ stroke: "#5677fa" }}
        />
      </g>
    );
  }
}

ResultFigureFlyout.propTypes = {
  datum: PropTypes.shape({
    posX: PropTypes.number,
    posY: PropTypes.number,
  }).isRequired,
};

export default ResultFigureFlyout;
