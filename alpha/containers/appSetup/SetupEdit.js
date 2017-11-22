import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { Container } from "reactstrap";
import _ from "lodash";
import { Form, actions } from "react-redux-form";
import ProgressBar from "~/commons/components/ProgressBar";
import generatePath from "../../lib/generatePath";
import { addApp } from "../../actions";
import { fetchEditApp, fetchAvailableServices, updateResourcesInAnalyzer, cacheServicesInForm } from "../../actions/setup";
import { editStepNames } from "../../constants/models";
import { app as AppPropType } from "../../constants/propTypes";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2Microservices from "./steps/Step2Microservices";
import Step3SLO from "./steps/Step3SLO";
import Step4ManagementFeatures from "./steps/Step4ManagementFeatures";

class SetupEdit extends React.Component {
  componentWillMount() {
    const appId = this.props.match.params.appId;
    // in edit mode
    if (appId) {
      this.props.fetchEditApp(this.props.match.params.appId);
    }
    this.props.fetchAvailableServices();
  }

  cancelEdit = () => {
    this.props.history.push("/dashboard");
  }

  cacheServices = (services) => {
    this.props.cacheServices(services);
    this.props.history.push("/setup/add/3");
  }

  handleSubmit = (app) => {
    // TODO: 
    // 1. insert selected resources into analyzer DB
    // 2. await and done add App   
    // 3. redirect to done page

    this.props.updateResources(app.services);
    this.props.addApp(app);

    this.props.history.push("/setup/done");
  }

  render() {
    const { editApp, match, history } = this.props;

    const step = _.toInteger(match.params.step);

    const stepActions = {};
    if (step !== 1) {
      stepActions.stepBack = () => history.push(generatePath(match.path, {step: step - 1}));
    }
    if (step !== 4) {
      stepActions.stepNext = () => history.push(generatePath(match.path, {step: step + 1}));
    }

    let formComponent = <Redirect to="/dashboard" />;
    switch (step) {
    case 1:
      formComponent = <Step1BasicInfo {...stepActions} cancelEdit={this.cancelEdit} />;
      break;
    case 2:
      formComponent = <Step2Microservices
        cacheServices={this.cacheServices}
        {...stepActions}
      />;
      break;
    case 3:
      formComponent = <Step3SLO {...stepActions} match={match} />;
      break;
    case 4:
      formComponent = <Step4ManagementFeatures {...stepActions} match={match} />;
      break;
    }

    return (
      <Container className="mb-5">
        <div className="row mt-3">
          { match.path === "/setup/edit/:appId" ?
            <h1 className="title">Configuring { editApp && editApp.name }</h1> :
            <h1 className="title">Setup a new app</h1>
          }
        </div>
        <div className="row mt-2 mb-5">
          <ProgressBar percent={25 * step} text={editStepNames[step]} />
        </div>
        { formComponent }
      </Container>
    );
  }
}

SetupEdit.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  editApp: AppPropType.isRequired,
  fetchEditApp: PropTypes.func.isRequired,
  fetchAvailableServices: PropTypes.func.isRequired,
  addApp: PropTypes.func.isRequired,
  updateResources: PropTypes.func.isRequired,
  cacheServices: PropTypes.func.isRequired,
};

const mapStateToProps = ({ applications: { editApp } }) => ({
  editApp,
});

const mapDispatchToProps = dispatch => ({
  fetchEditApp: appId => dispatch(fetchEditApp(appId)),
  fetchAvailableServices: () => dispatch(fetchAvailableServices()),
  updateEditForm: data => dispatch(actions.change("forms.singleApp", data)),
  cacheServices: services => dispatch(actions.change("forms.editApp.services", services)),
  addApp: app => dispatch(addApp(app)),
  updateResources: services => dispatch(updateResourcesInAnalyzer(services)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupEdit);
