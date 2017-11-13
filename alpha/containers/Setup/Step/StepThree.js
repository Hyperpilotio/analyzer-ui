import React from "react";
import { Link } from "react-router-dom";
import { Control } from "react-redux-form";
import _s from "../style.scss";

const StepThree = () => (
  <div>
    <div className="modal-form" >
      <div className="form-group">
        <label htmlFor="form-metric">Metric</label>
        <Control.text
          id="form-metric"
          className="form-control"
          model=".slo.metric"
        />
      </div>
      <div className="form-group">
        <label htmlFor="form-type-2">Type</label>
        <Control.select
          id="form-type-2"
          className="form-control"
          model=".slo.type"
        >
          <option value="latency">Latency</option>
          <option value="throughput">Throughput</option>
          <option value="execute_time">Execute-Time</option>
        </Control.select>
      </div>
      <div className="form-group">
        <label htmlFor="form-summary">Summary</label>
        <Control.text
          id="form-summary"
          className="form-control"
          model=".slo.summary"
        />
      </div>
      <div className="form-group">
        <label htmlFor="form-value">Value</label>
        <Control.text
          id="form-value"
          className="form-control"
          model=".slo.value"
        />
      </div>
      <div className="form-group">
        <label htmlFor="form-value">Unit</label>
        <Control.text
          id="form-value"
          className="form-control"
          model=".slo.unit"
        />
      </div>
      <div className={_s.btnRow}>
        <Link to="/setup/add/2" className="btn btn-secondary mr-2">Back</Link>
        <Link to="/setup/add/4" className="btn btn-primary">Next</Link>
      </div>
    </div>
  </div>
);


export default StepThree;
