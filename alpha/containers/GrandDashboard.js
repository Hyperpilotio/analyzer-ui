import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { actions as formActions } from "react-redux-form";
import ReactRouterPropTypes from "react-router-prop-types";
import ReactTimeout from "react-timeout";
import { Container, Row, Col } from "reactstrap";
import DashboardAppsTable from "../components/DashboardAppsTable";
import AppDiagnosis from "./AppDiagnosis";
import { fetchApps, removeApp } from "../actions";
import { app as appPropType, event as eventPropType } from "../constants/propTypes";
import withModal from "../lib/withModal";
import * as modalTypes from "../constants/modalTypes";
import _s from "./style.scss";


const mapStateToProps = ({
  ui: { isFetchAppsLoading, isFetchDiagnosticsLoading },
  applications,
  diagnosis: { incidents, problems, results },
}) => ({
  applications,
  incidents,
  problems,
  results,
  isFetchAppsLoading,
  isFetchDiagnosticsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
  removeAppInModal: appId => dispatch(removeApp(appId)),
  resetAppForm: () => {
    ["basicInfo", "microservices", "sloSource", "slo", "management_features"].forEach(
      form => dispatch(formActions.reset(`createAppForm.${form}`)),
    );
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@ReactTimeout
@withModal
export default class GrandDashboard extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    fetchApps: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    removeAppInModal: PropTypes.func.isRequired,
    resetAppForm: PropTypes.func.isRequired,
    refreshInterval: PropTypes.number,
  }

  static defaultProps = {
    refreshInterval: 30 * 1000,
  }

  componentWillMount() {
    this.refetchApps();
  }

  async refetchApps() {
    this.props.fetchApps();
    this.props.setTimeout(::this.refetchApps, this.props.refreshInterval)
  }

  openRemoveModal = (appId) => {
    this.props.openModal(
      modalTypes.ACTION_MODAL,
      {
        title: "Delete app",
        message: "Are you sure you want to delete this app?",
        onSubmit: () => { this.props.removeAppInModal(appId); },
      },
    );
  }

  render() {
    const {
      applicationss, results, incidents, problems,
      isFetchDiagnosticsLoading, isFetchAppsLoading,
      openModal,
    } = this.props;
    return (
      <div>
        <Switch>
          <Route path={`${this.props.match.path}/:appId`} component={AppDiagnosis} />
          <Route exact path={this.props.match.path}>
            <Container>
              <Row className="pt-4 pb-3">
                <Col>
                  <h3>Applications managed by HyperPilot</h3>
                </Col>
              </Row>
              <Row>
                <Link to="/apps/new" className="btn btn-primary mt-5 mb-2" onClick={this.props.resetAppForm}>
                  + Add
                </Link>
              </Row>
              <Row>
                <DashboardAppsTable
                  isLoading={isFetchAppsLoading}
                  openRemoveModal={appId => this.openRemoveModal(appId)}
                  {..._.pick(this.props, ["applications", "incidents", "risks", "opportunities"])}
                />
                { _.reject(this.props.applications, { state: "Unregistered" }).length <= 0 && !isFetchAppsLoading ?
                  <div className={_s.noData}>
                    <span>
                      No applications managed by HyperPilot, click on "Add" button to add them.
                    </span>
                  </div>
                  : null
                }
              </Row>
            </Container>
          </Route>
        </Switch>
      </div>
    );
  }
}
