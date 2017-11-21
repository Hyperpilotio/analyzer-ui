import React from "react";
import { Control } from "react-redux-form";
import { Link } from "react-router-dom";
import _s from "../style.scss";

const Step4ManagementFeatures = () => (
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
      <Link to="/setup/add/3" className="btn btn-secondary mr-2">Back</Link>
      <button type="submit" className="btn btn-success">Begin Hyperpiloting</button>
    </div>
  </div>
);

export default Step4ManagementFeatures;
