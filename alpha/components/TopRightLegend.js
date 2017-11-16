import React from "react";
import { VictoryLabel, VictoryLegend } from "victory-core";


const LegendRect = ({ x, y, style }) => (
  <rect x={x} y={y} width={30} height={5} style={{ fill: style.fill }} />
);
const LegendLabel = props => <g transform="translate(25,0)"><VictoryLabel {...props} /></g>;

export default class TopRightLegend extends VictoryLegend {
  static defaultProps = {
    ...VictoryLegend.defaultProps,
    dataComponent: <LegendRect />,
    labelComponent: <LegendLabel />,
  }

  legendWidth = null

  componentDidMount() {
    this.legendWidth = this.refs.legendRoot.getBBox().width;
    this.forceUpdate();
  }

  render() {
    const element = super.render();
    const newProps = { ref: "legendRoot" };
    const { width, marginRight, marginTop } = this.props;
    if (this.legendWidth !== null) {
      const xPos = width - this.legendWidth - marginRight;
      newProps.transform = `translate(${xPos} ${marginTop})`;
    }
    return React.cloneElement(element, newProps);
  }
}
