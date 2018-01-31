import React from "react";
import _ from "lodash";
import { Line, Area, VictoryLabel } from "victory-core";
import { inRangeInclusive } from "../lib/utils";

const ThresholdLine = ({ type, area, range, scale, threshold, label, marginLeft, style }) => {
  if (!inRangeInclusive(threshold, ...scale.y.domain())) {
    return <g />;
  }
  const yPos = scale.y(threshold);
  const [x1, x2] = range.x;
  return (
    <g>
      <Line x1={x1} x2={x2} y1={yPos} y2={yPos} style={style.line} />
      { area ?
        <Area
          interpolation="linear"
          scale={scale}
          data={
            scale.x.domain().map(limit => ({
              _x: limit,
              _y: threshold,
              _y0: type === "UB" ?
                _.max([scale.y.domain()[1], threshold]) :
                _.min([scale.y.domain()[0], threshold]),
            }))
          }
          style={{ stroke: "none", ...style.area }}
        /> : null
      }
      <VictoryLabel style={style.label} text={label} x={x2 + marginLeft} y={yPos} />
    </g>
  );
};

ThresholdLine.defaultProps = {
  label: "",
  marginLeft: 10,
  area: false,
  type: "UB",
};

export default ThresholdLine;
