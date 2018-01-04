import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { actions as formActions } from "react-redux-form";
import ReactRouterPropTypes from "react-router-prop-types";
import { Container, Row, Col } from "reactstrap";
import DashboardAppsTable from "../components/DashboardAppsTable";
import AppDiagnosis from "./AppDiagnosis";
import { fetchApps, fetchIncidents, fetchDiagnostics, removeApp } from "../actions";
import { app as appPropType, event as eventPropType } from "../constants/propTypes";
import withModal from "../lib/withModal";
import * as modalTypes from "../constants/modalTypes";


class DashboardPage extends React.Component {
  static propTypes = {
    // match: ReactRouterPropTypes.match.isRequired,
    // isFetchAppsLoading: PropTypes.bool.isRequired,
    // isFetchDiagnosticsLoading: PropTypes.bool.isRequired,
    fetchApps: PropTypes.func.isRequired,
    fetchIncidents: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    removeAppInModal: PropTypes.func.isRequired,
    resetAppForm: PropTypes.func.isRequired,
    // fetchDiagnostics: PropTypes.func.isRequired,
    // removeApp: PropTypes.func.isRequired,
    // apps: PropTypes.arrayOf(appPropType).isRequired,
    // incidents: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    // risks: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    // opportunities: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
  }

  componentWillMount() {
    this.props.fetchApps();
    // this.props.fetchIncidents();
    // this.props.fetchDiagnostics();
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
                  {..._.pick(this.props, ["applications", "incidents", "risks", "opportunities", "removeApp"])}
                />
              </Row>
            </Container>
          </Route>
        </Switch>
      </div>
    );
  }
}

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
  fetchIncidents: () => dispatch(fetchIncidents()),
  fetchDiagnostics: () => dispatch(fetchDiagnostics()),
  removeAppInModal: appId => dispatch(removeApp(appId)),
  resetAppForm: () => {
    ["basicInfo", "microservices", "sloSource", "slo", "management_features"].forEach(
      form => dispatch(formActions.reset(`createAppForm.${form}`)),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withModal(DashboardPage));
