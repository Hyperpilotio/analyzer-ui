import { VictoryTooltip } from "victory-core";


export default class DefaultDisabledTooltip extends VictoryTooltip {
  static displayName = "DefaultDisabledTooltip"

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
