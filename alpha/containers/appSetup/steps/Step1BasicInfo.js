import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Control } from "react-redux-form";
import { connect } from "react-redux";
import { createApp } from "../../../actions";
import _s from "../style.scss";

const Step1BasicInfo = ({ cancelEdit, submitBasicInfo, stepNext }) => (
  <Form model="createAppForm.basicInfo" onSubmit={data => submitBasicInfo(data, stepNext)}>
    <div className="form-group row">
      <label className="col-2">APP Name</label>
      <Control.text model=".name" className="form-control col" placeholder="Enter APP name" />
    </div>

    <div className="form-group row">
      <label className="col-2">Type</label>
      <Control.select model=".type" className="form-control col">
        <option value="long-running">long-running</option>
        <option value="batch-processing">batch-processing</option>
      </Control.select>
    </div>
    <div className="row d-flex">
      <button onClick={cancelEdit} className="btn btn-danger mr-auto">Cancel</button>
      <Control.reset model="createAppForm.basicInfo" className="btn btn-secondary mr-2">
        Reset
      </Control.reset>
      <button className="btn btn-primary" type="submit">Next</button>
    </div>
  </Form>
);

Step1BasicInfo.propTypes = {
  cancelEdit: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  submitBasicInfo: (basicInfo, next) => dispatch(createApp(basicInfo, next)),
});

export default connect(null, mapDispatchToProps)(Step1BasicInfo);
