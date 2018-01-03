import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Container } from "reactstrap";
import _ from "lodash";
import { actions } from "react-redux-form";
import ProgressBar from "~/commons/components/ProgressBar";
import { prepareEditAppForm } from "../../actions";
import { editStepNames } from "../../constants/models";
import { app as AppPropType } from "../../constants/propTypes";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2Microservices from "./steps/Step2Microservices";
import Step3SLO from "./steps/Step3SLO";
import Step4ManagementFeatures from "./steps/Step4ManagementFeatures";
import withModal from "../../lib/withModal";
import * as modalTypes from "../../constants/modalTypes";

class SetupEdit extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    prepareEditAppForm: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const appId = this.props.match.params.appId;
    this.props.prepareEditAppForm(appId);
  }

  cancelEdit = (e) => {
    e.preventDefault();
    this.props.openModal(
      modalTypes.ACTION_MODAL,
      {
        title: "Cancel configuration",
        message: "Are you sure you wnat to cancel the configuration ?",
        onSubmit: () => { this.props.history.push("/dashboard"); },
      },
    );
  }

  openMicroservicesErrorModal = (res) => {
    this.props.openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Fetch microservices error",
        message: res.payload.response.message,
      });
  }

  render() {
    const { createAppForm, isLoading, match, history } = this.props;
    if (isLoading) return null;

    let formComponent = <Redirect to="/dashboard" />;
    const stepActions = {};
    const step = _.toInteger(match.params.step) || 1;

    if (match.path === "/apps/new") {
      stepActions.stepNext = appId => history.push(`/apps/${appId}/edit/2`);
      stepActions.mode = "create";
      formComponent = <Step1BasicInfo {...stepActions} cancelEdit={this.cancelEdit} />;
    } else {
      if (step !== 1) {
        stepActions.stepBack = () => history.push(`/apps/${match.params.appId}/edit/${step - 1}`);
      }
      if (step !== 4) {
        stepActions.stepNext = () => history.push(`/apps/${match.params.appId}/edit/${step + 1}`);
      }

      if (step === 1) {
        stepActions.mode = "edit";
        formComponent = <Step1BasicInfo {...stepActions} cancelEdit={this.cancelEdit} />;
      } else if (step === 2) {
        formComponent = <Step2Microservices {...stepActions} openMicroservicesErrorModal={res => this.openMicroservicesErrorModal(res)} />;
      } else if (step === 3) {
        formComponent = <Step3SLO {...stepActions} match={match} />;
      } else if (step === 4) {
        stepActions.stepNext = () => history.push(`/apps/${match.params.appId}/edit/done`);
        formComponent = <Step4ManagementFeatures {...stepActions} match={match} />;
      }
    }

    return (
      <Container className="mb-5">
        <div className="row mt-3">
          { match.path.startsWith("/apps/:appId/edit/") ?
            <h1 className="title">Configuring { createAppForm.basicInfo.name }</h1> :
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

const mapStateToProps = ({ createAppForm, ui }) => ({
  createAppForm,
  isLoading: ui.isFetchAppsLoading,
});

const mapDispatchToProps = dispatch => ({
  prepareEditAppForm: appId => dispatch(prepareEditAppForm(appId)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withModal(SetupEdit));
