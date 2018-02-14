import React, { Component } from "react";
import NumberFormat from "react-number-format";
import _s from "./style.scss";


/* eslint-disable */
class PercentCalc extends Component {
  render() {
    const {
      top,
      bottom,
      opposite,
      style,
    } = this.props;

    const result = top / bottom;

    return (
      <NumberFormat
        value={result * 100 }
        style={{ color: `${ result >= 0 ? "green" : "red" }`, ...style }}
        displayType={"text"}
        suffix={"%"}
        prefix={`${ opposite ? "-" : null }`}
        />
    );
  }
}
/* eslint-enable */

export default PercentCalc;
