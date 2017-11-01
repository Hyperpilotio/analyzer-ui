import React from "react";
import _s from "./style.scss";

const Spinner = () => (
  <div className={`${_s.first} ${_s.spinnerGrp}`}>
    <div className={`${_s.second} ${_s.spinnerGrp}`}>
      <div className={`${_s.third} ${_s.spinnerGrp}`} />
    </div>
  </div>
);

export default Spinner;
