import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Container } from "reactstrap";
import _ from "lodash";
import Spinner from "react-spinkit";
import ProgressBar from "~/commons/components/ProgressBar";
import { prepareEditAppForm } from "../../actions";
import { editStepNames } from "../../constants/models";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2Microservices from "./steps/Step2Microservices";
import Step3SLO from "./steps/Step3SLO";
import Step4ManagementFeatures from "./steps/Step4ManagementFeatures";
import withModal from "../../lib/withModal";
import * as modalTypes from "../../constants/modalTypes";
import _s from "./style.scss";


const mapStateToProps = ({ createAppForm: { basicInfo }, ui }) => ({
  basicInfo,
  isLoading: ui.FETCH_APPS.pending,
});

const mapDispatchToProps = dispatch => ({
  prepareEditAppForm: appId => dispatch(prepareEditAppForm(appId)),
});

@connect(mapStateToProps, mapDispatchToProps)
@withModal
export default class SetupEdit extends React.Component {
  static propTypes = {
    ...withModal.propTypes,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    isLoading: PropTypes.bool.isRequired,
    basicInfo: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    prepareEditAppForm: PropTypes.func.isRequired,
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
        message: "Are you sure you want to cancel the configuration?",
        onSubmit: () => { this.props.history.push("/dashboard"); },
      },
    );
  }

  render() {
    const { basicInfo, isLoading, match, history } = this.props;
    if (isLoading) {
      return (
        <Container className={_s.container}>
          <div className={_s.loaderCon}>
            <Spinner fadeIn="quarter" name="pacman" />
          </div>
        </Container>
      );
    }
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
        formComponent = <Step2Microservices {...stepActions} />;
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
            <h1 className="title">Configuring { basicInfo.name }</h1> :
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
