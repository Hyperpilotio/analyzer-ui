import {
  combineContainerMixins,
  zoomContainerMixin,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
} from "victory-chart";
import { Data } from "victory-core";
import _ from "lodash";

Data.getData = (props) => {
  if (props.isData) {
    return props.data.map(({ x, y }, eventKey) => ({ eventKey, x, y, _x: x, _y: y }));
  }
  return null;
};

export const timeSeriesContainerMixin = base => class VictoryTimeSeriesContainer extends base {
  static displayName = "VictoryTimeSeriesContainer"
  static defaultProps = {
    ...base.defaultProps,
    voronoiDimension: "x",
    zoomDimension: "x",
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
}

export default combineContainerMixins([
  zoomContainerMixin,
  timeSeriesContainerMixin,
], VictoryVoronoiContainer);
