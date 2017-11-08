import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import _s from "../style.scss";

const StepOne = props => (
  <div className="modal-formeffect-fade-in">
    <div className="form-group">
      <label htmlFor="appName">APP Name</label>
      <Control.text model=".name" className="form-control" id="appName" placeholder="Enter APP name" />
    </div>

    <div className="form-group">
      <label htmlFor="form-type-1">Type</label>
      <Control.select model=".type" id="form-type-1" className="form-control">
        <option value="long-running">long-running</option>
        <option value="batch-processing">batch-processing</option>
      </Control.select>
    </div>
    <div className={_s.btnRow}>
      <textbox className={`mr-2 ${_s.btnCancel}`} onClick={props.cancelEdit}>
        <Control.reset model="forms.editApp" className="btn btn-secondary">
          Cancel
        </Control.reset>
      </textbox>
      <button className="btn btn-primary" onClick={props.stepNext}>Next</button>
    </div>
  </div>

);

StepOne.propTypes = {
  cancelEdit: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
};

export default StepOne;
