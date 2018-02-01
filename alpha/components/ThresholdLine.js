import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Line, Area, VictoryLabel } from "victory-core";
import { BaseProps } from "victory-chart/es/helpers/common-props";
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
              // _x, _y, _y0 is what Area actually used, which can trace down to https://github.com/FormidableLabs/victory-core/blob/master/src/victory-primitives/helpers.js
              _x: limit,
              _y: threshold,
              // If it's an upper bound, than the area above the threshold line should be filled
              // with red, and if it's a lower bound, the area is below the threshold line
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

ThresholdLine.propTypes = {
  ...BaseProps,
  type: PropTypes.oneOf(["UB", "LB"]),
  area: PropTypes.bool,
  label: PropTypes.string,
  marginLeft: PropTypes.number,
};

ThresholdLine.defaultProps = {
  label: "",
  marginLeft: 10,
  area: false,
  type: "UB",
};

export default ThresholdLine;
