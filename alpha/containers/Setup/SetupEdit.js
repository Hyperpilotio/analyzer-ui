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
import { minusStepNumber, addStepNumber, addToHyperPilot, removeFromHyperPilot } from "../../actions";
import { fetchEditApp, fetchAvaliableServices } from "../../actions/setup";
import { editStepNames } from "../../constants/models";
import { app as AppPropType } from "../../constants/propTypes";
import StepOne from "./Step/StepOne";
import StepTwo from "./Step/StepTwo";
import StepThree from "./Step/StepThree";
import StepFour from "./Step/StepFour";

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
    this.props.history.push("/dashboard");
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleSubmit = (app) => {
    // TODO: will call API for submitting form later 
    this.props.stepNext();
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
      stepBack, stepNext, step,
      editApp, availableApps, addedApps,
      onAddClick, onRemoveClick,
      match,
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
            <ProgressBar percent={25 * parseInt(match.params.step, 10)} text={editStepNames[step]} />
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
  step: PropTypes.number.isRequired,
  editApp: AppPropType.isRequired,
  availableApps: PropTypes.arrayOf(AppPropType).isRequired,
  addedApps: PropTypes.arrayOf(AppPropType).isRequired,
  fetchEditApp: PropTypes.func.isRequired,
  fetchAvaliableServices: PropTypes.func.isRequired,
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
