import React from "react";
import { Line, VictoryLabel } from "victory-core";

const ThresholdLine = ({ range, scale, threshold, label, marginLeft, style }) => {
  const yPos = scale.y(threshold);
  const [x1, x2] = range.x;
  return (
    <g>
      <Line x1={x1} x2={x2} y1={yPos} y2={yPos} style={style.line} />
      <VictoryLabel style={style.label} text={label} x={x2 + marginLeft} y={yPos} />
    </g>
  );
};

ThresholdLine.defaultProps = {
  label: "",
  marginLeft: 10,
};

export default ThresholdLine;
