import React from "react";
import PropTypes from "prop-types";
import { Form, Control } from "react-redux-form";
import { connect } from "react-redux";
import { updateApp, createApp } from "../../../actions";

const Step1BasicInfo = ({ cancelEdit, submitBasicInfo }) => (
  <Form model="createAppForm.basicInfo" onSubmit={submitBasicInfo}>
    <div className="form-group row">
      <label htmlFor="basic-app" className="col-2">APP Name</label>
      <Control.text model=".name" id="basic-app" className="form-control col" placeholder="Enter APP name" />
    </div>
    <div className="form-group row">
      <label htmlFor="basic-type" className="col-2">Type</label>
      <Control.select model=".type" id="basic-type" className="form-control col">
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
  submitBasicInfo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, { stepNext, mode }) => ({
  submitBasicInfo: (basicInfo) => {
    if (mode === "create") {
      dispatch(createApp(basicInfo, stepNext));
    } else {
      dispatch(updateApp(basicInfo, stepNext));
    }
  },
});

export default connect(null, mapDispatchToProps)(Step1BasicInfo);
