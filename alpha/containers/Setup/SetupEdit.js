import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
} from "reactstrap";
import { Control, Form, actions } from "react-redux-form";
import ProgressBar from "~/commons/components/ProgressBar";
import { minusStepNumber, addStepNumber, addToHyperPilot, removeFromHyperPilot } from "../../actions";
import { fetchEditApp, fetchAvaliableServices } from "../../actions/setup";
import { editStepNames } from "../../constants/models";
import { app as appPropType } from "../../constants/propTypes";
import _s from "./style.scss";
import StepOne from "./Step/StepOne";
import StepTwo from "./Step/StepTwo";

class SetupEdit extends React.Component {
  state = {
    activeTab: "1",
    dropdownOpenOne: false,
    dropdownOpenTwo: false,
    dropdownOpenThree: false,
    dropdownOpenFour: false,
  }

  componentWillMount() {
    const appId = this.props.match.params.appId;
    // in edit mode
    if (appId) {
      this.props.fetchEditApp(this.props.match.params.appId);
    }
    this.props.fetchAvaliableServices();
  }
  cancelEdit = () => {
    this.props.history.push("/setup");
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  // to step 2
  handleSubmit = (app) => {
    this.props.stepNext();
  }

  // TODO: changing tab state
  toggleTabs = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      stepBack,
      stepNext,
      apps,
      editApp,
      step,
      onAddClick,
      onRemoveClick,
      availableApps,
      addedApps,
      match
    } = this.props;

    return (
      <Container>
        <Form
          model="forms.editApp"
          className="edit-app-form"
          onSubmit={app => this.handleSubmit(app)}
        >
          <div className="row mt-3">
            {location.pathname === `/setup/edit/${match.params.appId}` ?
              <h1 className="title">Configuring {editApp && editApp.name}</h1> :
              <h1 className="title">Setup a new app</h1>
            }
          </div>
          <div className="row mt-2 mb-5">
            <ProgressBar percent={25 * step} text={editStepNames[step]} />
          </div>

          { step === 1 ? <StepOne cancelEdit={this.cancelEdit} stepNext={stepNext} /> : null }
          { step === 2 ?
            <StepTwo
              activeTab={this.state.activeTab}
              addedApps={addedApps}
              availableApps={availableApps}
              onAddClick={onAddClick}
              onRemoveClick={onRemoveClick}
              stepBack={stepBack}
              stepNext={stepNext}
              toggleTabs={this.toggleTabs}
            /> : null
          }
          { step === 3 ?
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
                    <option value="executeTime">Execute-Time</option>
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
                  <button className="btn btn-secondary mr-2" onClick={stepBack}>Back</button>
                  <button className="btn btn-primary" onClick={stepNext}>Next</button>
                </div>
              </div>
            </div>
            : null }
          { step === 4 ?
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
                <button className="btn btn-secondary mr-2" onClick={stepBack}>Back</button>
                <Link to="/setup"><button type="submit" className="btn btn-primary">Done</button></Link>
              </div>
            </div>
            : null }
        </Form>
      </Container>
    );
  }
}

SetupEdit.propTypes = {
  step: PropTypes.number.isRequired,
  apps: PropTypes.arrayOf(appPropType).isRequired,
  stepBack: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ setup: { apps, step, editApp, k8sResources, addedResourceIds } }) => ({
  apps,
  step,
  editApp,
  k8sResources,
  availableApps: k8sResources.filter(resource => !addedResourceIds.includes(resource._id)),
  addedApps: k8sResources.filter(resource => addedResourceIds.includes(resource._id)),
});

const mapDispatchToProps = dispatch => ({
  stepBack: () => dispatch(minusStepNumber()),
  stepNext: () => dispatch(addStepNumber()),
  onAddClick: id => dispatch(addToHyperPilot(id)),
  onRemoveClick: id => dispatch(removeFromHyperPilot(id)),
  fetchEditApp: appId => dispatch(fetchEditApp(appId)),
  fetchAvaliableServices: () => dispatch(fetchAvaliableServices()),
  updateEditForm: data => dispatch(actions.change("forms.singleApp", data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupEdit);
