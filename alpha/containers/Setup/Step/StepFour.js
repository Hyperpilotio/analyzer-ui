import React from "react";
import { Control } from "react-redux-form";
import ReactRouterPropTypes from "react-router-prop-types";
import { Link } from "react-router-dom";
import _s from "../style.scss";

const StepFour = props => (
  <div>
    {/* Interference Management */}
    <div className="form-group">
      <label htmlFor="form-type-3">Interference Management</label>
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
      <label htmlFor="form-type-4">Bottleneck Management</label>
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
      <label htmlFor="form-type-5">Efficiency Management</label>
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
      <Link to={`${props.match.url}/3`} className="btn btn-secondary mr-2">Back</Link>
      <Link to="/setup/done"><button type="submit" className="btn btn-success">Begin Hyperpiloting</button></Link>
    </div>
  </div>
);

StepFour.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default StepFour;
