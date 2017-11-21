import { VictoryVoronoiContainer } from "victory-chart";
import { Data } from "victory-core";
import _ from "lodash";

const originalGetData = Data.getData.bind(Data);
Data.getData = (props) => {
  if (props.isData) {
    return originalGetData(props);
  }
  return null;
};

export default class TimeSeriesTooltipContainer extends VictoryVoronoiContainer {
  static displayName = "TimeSeriesTooltipContainer"
  static defaultProps = {
    ...VictoryVoronoiContainer.defaultProps,
    voronoiDimension: "x",
    labels: () => "",
  }

  getLabelProps(props, points) {
    const { scale, labelComponent, theme, mousePosition } = props;
    const componentProps = labelComponent.props || {};
    const style = this.getStyle(props, points, "labels");
    return _.defaults(
      {
        x: scale.x(points[0].x),
        y: mousePosition.y,
        active: true,
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
