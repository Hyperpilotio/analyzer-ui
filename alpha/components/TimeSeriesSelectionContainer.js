import {
  combineContainerMixins,
  selectionContainerMixin,
  VictoryVoronoiContainer,
  VoronoiHelpers,
} from "victory-chart";
import { Data } from "victory-core";
import _ from "lodash";

Data.getData = (props) => {
  // Overriding https://github.com/FormidableLabs/victory-core/blob/964803118ff2fbbe3f64c49733e2a172fc0dd7d6/src/victory-util/data.js#L19-L31
  // Avoid doing time-costy `formatData` within this function
  if (props.isData) {
    return props.data.map(({ x, y }, eventKey) => ({ eventKey, x, y, _x: x, _y: y }));
  }
  return null;
};

VoronoiHelpers.onMouseMove = _.throttle(
  // Overriding https://github.com/FormidableLabs/victory-chart/blob/138a974af346929b93201daaa049b10666ee1619/src/components/containers/voronoi-helpers.js#L146-L168
  _.wrap(
    VoronoiHelpers.onMouseMove,
    (onMouseMove, evt, targetProps) => {
      // Hide tooltip (i.e. empty activePoints prop, i.e. call onMouseLeave)
      // when the user starts to drag a selection on the graph
      if (targetProps.select) {
        if (_.isEmpty(targetProps.activePoints)) {
          return {};
        }
        return {
          id: _.uniqueId("throttledEvent"),
          mutations: VoronoiHelpers.onMouseLeave(evt, targetProps),
        };
      }
      return onMouseMove(evt, targetProps);
    },
  ),
  32,
  { leading: true, trailing: false },
);

export const timeSeriesContainerMixin = base => class VictoryTimeSeriesContainer extends base {
  static displayName = "VictoryTimeSeriesContainer"
  static defaultProps = {
    ...base.defaultProps,
    voronoiDimension: "x",
    selectionDimension: "x",
    labels: () => "",
  }
  static defaultEvents = base.defaultEvents

  getLabelProps(props, points) {
    const { scale, labelComponent, theme, mousePosition } = props;
    const componentProps = labelComponent.props || {};
    const style = this.getStyle(props, points, "labels");
    return _.defaults(
      {
        x: scale.x(points[0].x),
        y: mousePosition.y,
        active: !_.isNull(points[0].y),
        datum: { x: 0, y: 0 },
        text: "",
        points,
        scale,
        style,
        theme,
      },
      componentProps,
      this.getDefaultLabelProps(props, points),
    );
  }
};

export default combineContainerMixins([
  selectionContainerMixin,
  timeSeriesContainerMixin,
], VictoryVoronoiContainer);
