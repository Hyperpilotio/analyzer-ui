import React from "react";
import { VictoryVoronoiContainer } from "victory-chart";
import { Selection } from "victory-core";
import { bisect } from "d3-array";
import _ from "lodash";


const getDatasets = children => _.map(_.filter(React.Children.toArray(children), "props.isData"), "props");

const getTimes = datasets => datasets.reduce((times, { data }) => {
  if (times.length === 0) {
    return _.map(data, "x");
  } else if (data.length === 0) {
    return times;
  }

  const output = [];
  let i = 0;
  let j = 0;
  while (i < times.length && j < data.length) {
    let next;
    if (times[i].x < data[j].x) {
      next = data[i].x;
      i += 1;
    } else {
      next = data[j].x;
      j += 1;
    }
    if (next !== _.get(_.last(output), "x")) {
      output.push(next);
    }
  }
  return output;
}, []);


export default class TimeSeriesTooltipContainer extends VictoryVoronoiContainer {
  static displayName = "TimeSeriesTooltipContainer"

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseMove: (evt, targetProps) => {
        const mousePosition = Selection.getSVGEventCoordinates(evt);
        const { scale } = targetProps;
        const [x0, x1] = scale.x.range();
        if (_.inRange(mousePosition.y, ...scale.y.range()) &&
            _.inRange(mousePosition.x, x0 - 10, x1 + 10)) {
          const datasets = getDatasets(targetProps.children);
          const times = getTimes(datasets);
          const highlightedTimeIndex = bisect(times, scale.x.invert(mousePosition.x));
          const highlightedTime = times[highlightedTimeIndex];
          const matchedPoints = _.filter(
            datasets.map(({ data, ...props }) => ({
              ...props,
              point: _.find(data, { x: highlightedTime }),
            })),
            "point",
          );
          const activePoints = matchedPoints.map(({ name, point, style }) => ({
            name,
            style,
            ...point,
          }));
          return [{
            target: "parent",
            eventKey: "parent",
            mutation: () => ({ activePoints }),
          }];
        }
        return null;
      },
    },
  }]
}
