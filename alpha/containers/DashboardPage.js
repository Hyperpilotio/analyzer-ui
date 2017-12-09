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
import { fetchApps, fetchDiagnostics, removeApp } from "../actions";
import { app as appPropType, event as eventPropType } from "../constants/propTypes";


class DashboardPage extends React.Component {
  static propTypes = {
    // match: ReactRouterPropTypes.match.isRequired,
    // isFetchAppsLoading: PropTypes.bool.isRequired,
    // isFetchDiagnosticsLoading: PropTypes.bool.isRequired,
    // fetchApps: PropTypes.func.isRequired,
    // fetchDiagnostics: PropTypes.func.isRequired,
    // removeApp: PropTypes.func.isRequired,
    // apps: PropTypes.arrayOf(appPropType).isRequired,
    // incidents: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    // risks: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    // opportunities: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
  }

  componentWillMount() {
    this.props.fetchApps();
    // this.props.fetchDiagnostics();
  }

  render() {
    const {
      applicationss, results, incidents, problems,
      isFetchDiagnosticsLoading, isFetchAppsLoading,
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
  fetchDiagnostics: () => dispatch(fetchDiagnostics()),
  removeApp: appId => dispatch(removeApp(appId)),
  resetAppForm: () => {
    ["basicInfo", "microservices", "sloSource", "slo", "management_features"].forEach(
      form => dispatch(formActions.reset(`createAppForm.${form}`)),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
