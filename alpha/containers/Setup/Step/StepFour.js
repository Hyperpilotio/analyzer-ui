import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import { Link } from "react-router-dom";
import _s from "../style.scss";

const StepFour = props => (
  <div>
    {/* interface */}
    <div className="form-group">
      <label htmlFor="form-type-3">Interface</label>
      <Control.select
        id="form-type-3"
        className="form-control"
        model=".management_features[0].mode"
      >
        <option value="Disabled">Disabled</option>
        <option value="Manual">Manual</option>
        <option value="Semi-Auto">Semi-Auto</option>
        <option value="Full-Auto">Full-Auto</option>
      </Control.select>
    </div>
    {/* Bottleneck */}
    <div className="form-group">
      <label htmlFor="form-type-4">Bottleneck</label>
      <Control.select
        id="form-type-4"
        className="form-control"
        model=".management_features[1].mode"
      >
        <option value="Disabled">Disabled</option>
        <option value="Manual">Manual</option>
        <option value="Semi-Auto">Semi-Auto</option>
        <option value="Full-Auto">Full-Auto</option>
      </Control.select>
    </div>
    {/* Type */}
    <div className="form-group">
      <label htmlFor="form-type-5">Type</label>
      <Control.select
        id="form-type-5"
        className="form-control"
        model=".management_features[2].mode"
      >
        <option value="Disabled">Disabled</option>
        <option value="Manual">Manual</option>
        <option value="Semi-Auto">Semi-Auto</option>
        <option value="Full-Auto">Full-Auto</option>
      </Control.select>
    </div>
    <div className={_s.btnRow}>
      <button className="btn btn-secondary mr-2" onClick={props.stepBack}>Back</button>
      <Link to="/setup"><button type="submit" className="btn btn-primary">Done</button></Link>
    </div>
  </div>
);

StepFour.propTypes = {
  stepBack: PropTypes.func.isRequired,
};

export default StepFour;
