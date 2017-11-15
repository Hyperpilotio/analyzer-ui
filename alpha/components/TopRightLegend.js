import React from "react";
import { VictoryLegend } from "victory-core";


export default class TopRightLegend extends VictoryLegend {
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
