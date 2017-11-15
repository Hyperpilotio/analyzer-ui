import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import {
  Container,
} from "reactstrap";
import { Form, actions } from "react-redux-form";
import ProgressBar from "~/commons/components/ProgressBar";
import { minusStepNumber, addStepNumber, addToHyperPilot, removeFromHyperPilot, addApp } from "../../actions";
import { fetchEditApp, fetchAvailableServices } from "../../actions/setup";
import { editStepNames } from "../../constants/models";
import { app as AppPropType } from "../../constants/propTypes";
import StepOne from "./Step/StepOne";
import StepTwo from "./Step/StepTwo";
import StepThree from "./Step/StepThree";
import StepFour from "./Step/StepFour";

class SetupEdit extends React.Component {
  state = {
    rSelected: 1,
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
    this.props.fetchAvailableServices();
    // this.props.addSingleApp();
  }

  onRadioBtnClick = (rSelected) => {
    this.setState({ rSelected });
  }

  cancelEdit = () => {
    this.props.history.push("/dashboard");
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleSubmit = (app) => {
    // TODO: will call API for submitting form later 
    console.log("submit app", app);

    this.props.addApp(app);
    this.props.history.push("/setup/done");
  }

  toggleTabs = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      stepBack, stepNext,
      editApp, availableApps, addedApps,
      onAddClick, onRemoveClick,
      match,
    } = this.props;

    const step = parseInt(match.params.step, 10);

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
          <Switch>
            <Route
              path="/setup/add/1"
              render={() => (
                <StepOne
                  cancelEdit={this.cancelEdit}
                  match={match}
                />
              )}
            />
            <Route
              path="/setup/add/2"
              render={() => (
                <StepTwo
                  activeTab={this.state.activeTab}
                  addedApps={addedApps}
                  availableApps={availableApps}
                  onAddClick={onAddClick}
                  onRemoveClick={onRemoveClick}
                  stepBack={stepBack}
                  stepNext={stepNext}
                  toggleTabs={this.toggleTabs}
                  onRadioBtnClick={this.onRadioBtnClick}
                  rSelected={this.state.rSelected}
                  match={match}
                />
              )}
            />
            <Route
              path="/setup/add/3"
              render={() => (
                <StepThree
                  stepBack={stepBack}
                  match={match}
                />
              )}
            />
            <Route
              path="/setup/add/4"
              render={() => (
                <StepFour
                  stepBack={stepBack}
                  match={match}
                />
              )}
            />
          </Switch>
        </Form>
      </Container>
    );
  }
}

SetupEdit.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  editApp: AppPropType.isRequired,
  availableApps: PropTypes.arrayOf(AppPropType).isRequired,
  addedApps: PropTypes.arrayOf(AppPropType).isRequired,
  fetchEditApp: PropTypes.func.isRequired,
  fetchAvailableServices: PropTypes.func.isRequired,
  stepBack: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  addApp: PropTypes.func.isRequired,
};

const mapStateToProps = ({ applications: { apps, editApp, k8sResources, addedResourceIds } }) => ({
  apps,
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
  fetchAvailableServices: () => dispatch(fetchAvailableServices()),
  updateEditForm: data => dispatch(actions.change("forms.singleApp", data)),
  addApp: app => dispatch(addApp(app)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupEdit);
