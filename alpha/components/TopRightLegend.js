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
    let newProps = { ref: "legendRoot" };
    if (this.legendWidth !== null) {
      const xPos = this.props.width - this.legendWidth - this.props.marginRight;
      newProps.transform = `translate(${ xPos } ${ this.props.marginTop })`;
    }
    return React.cloneElement(element, newProps);
  }
}
