import { VictoryTooltip } from "victory-core";


export default class DefaultPreventedTooltip extends VictoryTooltip {
  static displayName = "DefaultPreventedTooltip"

  getCalculatedValues(props) {
    return {
      transform: this.getTransform(props),
    };
  }

  getFlyoutProps(evaluatedProps) {
    return { ...this.props, ...evaluatedProps, key: `flyout-${evaluatedProps.index}` };
  }

  getLabelProps(evaluatedProps) {
    return { ...this.props, ...evaluatedProps, key: `label-${evaluatedProps.index}` };
  }
}
