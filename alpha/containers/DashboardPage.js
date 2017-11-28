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
import ManagedAppPage from "./ManagedAppPage";
import { fetchApps, fetchEvents, removeApp } from "../actions";
import { app as appPropType, event as eventPropType } from "../constants/propTypes";


class DashboardPage extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    isFetchAppsLoading: PropTypes.bool.isRequired,
    isFetchEventsLoading: PropTypes.bool.isRequired,
    fetchApps: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    removeApp: PropTypes.func.isRequired,
    apps: PropTypes.arrayOf(appPropType).isRequired,
    incidents: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    risks: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    opportunities: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
  }

  componentWillMount() {
    this.props.fetchApps();
    this.props.fetchEvents();
  }

  render() {
    const { isFetchEventsLoading, isFetchAppsLoading } = this.props;
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.path}/:appId`}
            render={({ match }) => {
              const app = _.find(this.props.apps, { _id: match.params.appId });
              if (_.isUndefined(app)) {
                return null;
              }
              return (
                <ManagedAppPage
                  match={match}
                  app={app}
                  incidents={this.props.incidents[app._id]}
                  opportunities={this.props.opportunities[app._id]}
                />
              );
            }}
          />
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
                  isLoading={isFetchAppsLoading || isFetchEventsLoading}
                  {..._.pick(this.props, ["apps", "incidents", "risks", "opportunities", "removeApp"])}
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
  ui: { isFetchAppsLoading, isFetchEventsLoading },
  applications: { apps },
  diagnosis: { incidents, risks, opportunities },
}) => ({
  apps,
  incidents,
  risks,
  opportunities,
  isFetchAppsLoading,
  isFetchEventsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
  fetchEvents: () => dispatch(fetchEvents()),
  removeApp: appId => dispatch(removeApp(appId)),
  resetAppForm: () => {
    for (const form of ["basicInfo", "microservices", "sloSource", "slo", "management_features"]) {
      dispatch(formActions.reset(`createAppForm.${form}`));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
