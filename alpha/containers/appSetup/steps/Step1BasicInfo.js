import React from "react";
import PropTypes from "prop-types";
import { Form, Control, Errors } from "react-redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import _s from "../style.scss";
import { updateApp, createApp, resetLoadingState } from "../../../actions";
import Button from "../../../components/Button";

class Step1BasicInfo extends React.Component {
  static propTypes = {
    resetLoadingState: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.resetLoadingState();
  }
  render = () => {
    const { cancelEdit, submitBasicInfo, loadingState, appId } = this.props;
    return (
      <Form model="createAppForm.basicInfo" onSubmit={submitBasicInfo}>
        <div className={_s.inputRow}>
          <div className={`form-group row ${_s.formGroup}`}>
            <label htmlFor="basic-app" className="col-2">APP Name</label>
            <Control.text
              model=".name"
              id="basic-app"
              className="form-control col"
              placeholder="Enter APP name"
              validators={{ required: val => val && val.length }}
            />
          </div>
          <Errors
            wrapper={props => (<div className="row"><div className="col-2" /><div className={_s.errorMessage}>{props.children}</div></div>)}
            model=".name"
            show={field => field.touched && !field.focus}
            messages={{
              required: "Please type app name",
            }}
          />
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
          <Button
            isLoading={loadingState.createApp.pending || _.get(loadingState.updateApp.map, [appId, "pending"], false)}
            color="primary"
          >Next</Button>
        </div>
      </Form>
  );
}

}

Step1BasicInfo.propTypes = {
  submitBasicInfo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  loadingState: PropTypes.object,
  appId: PropTypes.string,
};

const mapStateToProps = ({ createAppForm: { basicInfo }, ui: { CREATE_APP, UPDATE_APP } }) => ({
  appId: basicInfo.app_id,
  loadingState: {
    createApp: CREATE_APP,
    updateApp: UPDATE_APP,
  },
});

const mapDispatchToProps = (dispatch, { stepNext, mode }) => ({
  submitBasicInfo: (basicInfo) => {
    if (mode === "create") {
      dispatch(createApp(basicInfo, stepNext));
    } else {
      dispatch(updateApp(basicInfo, stepNext));
    }
  },
  resetLoadingState: () => dispatch(resetLoadingState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step1BasicInfo);
