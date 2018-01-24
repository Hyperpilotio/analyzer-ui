import React from "react";
import moment from "moment";
import _ from "lodash";


const styles = {
  background: {
    fill: "rgba(247,249,252,0.9)",
  },
  box: {
    stroke: "#5677fa",
    fill: "rgba(140,177,250,0.05)",
  },
  title: {
    alignmentBaseline: "hanging",
    stroke: "#606175",
    fontSize: 18,
  },
  metricValue: {
    alignmentBaseline: "middle",
  },
  indexLine: {
    stroke: "#8cb1fa",
    strokeWidth: 1.5,
  },
};

export default class MultiPointFlyout extends React.Component {
  constructor(props) {
    super(props);
    this.width = 280;
    this.height = 80;
    this.mainBox = null;
    this.shouldUpdateSize = true;
  }

  componentWillReceiveProps() {
    this.shouldUpdateSize = true;
  }

  componentDidMount() {
    this.updateSize();
  }

  componentDidUpdate() {
    this.updateSize();
  }

  updateSize() {
    if (this.shouldUpdateSize) {
      const bbox = this.mainBox.getBBox();
      this.width = 10 + bbox.width + 10;
      this.height = 10 + bbox.height + 10;
      this.shouldUpdateSize = false;
      this.forceUpdate();
    }
  }

  getPlacement() {
    const { scale } = this.props;
    return (this.props.x > scale.x.range()[1] - this.width) ? "left" : "right";
  }

  render() {
    const { x, y, scale, points } = this.props;
    const placement = this.getPlacement();
    const [y1, y2] = scale.y.range();

    const containerElement = <rect rx={4} ry={4} width={this.width} height={this.height} />;
    const xShift = placement === "right" ? 20 : -this.width - 20;
    const yShift = _.clamp(y - 20, y2, y1 - this.height);

    return (
      <g transform={`translate(${x},0)`}>
        <line x1={0} x2={0} y1={y1} y2={y2} style={styles.indexLine} />
        <g transform={`translate(${xShift},${yShift})`}>
          { React.cloneElement(containerElement, { style: styles.background }) }
          { React.cloneElement(containerElement, { style: styles.box }) }
          <g ref={(g) => { this.mainBox = g; }} transform="translate(10,10)">
            <text style={styles.title}>{ moment(points[0].x).format("YYYY-MM-DD HH:mm:ss") }</text>
            { points.map((point, i) => (
              <g key={point.childName} transform={`translate(0,${(i + 1) * 35})`}>
                <rect
                  x={0}
                  y={-5}
                  width={30}
                  height={5}
                  style={{ fill: point.style.data.stroke }}
                />
                <text x={40} style={styles.metricValue}>{ point.y }</text>
              </g>
            )) }
          </g>
        </g>
      </g>
    );
  }
}
