import React from "react";
import { VictoryVoronoiContainer } from "victory-chart";
import { Selection } from "victory-core";
import { bisect } from "d3-array";
import _ from "lodash";
import { Data } from "victory-core";

const originalGetData = Data.getData.bind(Data);
Data.getData = (props) => {
  if (props.isData) {
    return originalGetData(props);
  }
  return null;
}

export default class TimeSeriesTooltipContainer extends VictoryVoronoiContainer {
  static displayName = "TimeSeriesTooltipContainer"

  getLabelProps(props, points) {
    const { labels, scale, labelComponent, theme, mousePosition  } = props;
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
        scale, style, theme,
      },
      componentProps,
      this.getDefaultLabelProps(props, points),
    );
    return props;
  }
}
