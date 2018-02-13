import { VictoryTooltip } from "victory-core";

/*
 * Overriding VictoryTooltip, prevent all the default calculation behaviors to
 * increase the performance
 */
export default class DefaultPreventedTooltip extends VictoryTooltip {
  static displayName = "DefaultPreventedTooltip"

  getCalculatedValues = () => ({})

  getFlyoutProps(evaluatedProps) {
    return { ...this.props, ...evaluatedProps, key: `flyout-${evaluatedProps.index}` };
  }

  getLabelProps(evaluatedProps) {
    return { ...this.props, ...evaluatedProps, key: `label-${evaluatedProps.index}` };
  }
}
