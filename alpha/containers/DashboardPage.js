import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import _ from "lodash";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import DashboardAppsTable from "../components/DashboardAppsTable";
import ManagedAppPage from "./ManagedAppPage";
import { fetchApps, fetchEvents } from "../actions";
import { app as appPropType, event as eventPropType } from "../constants/propTypes";


class DashboardPage extends React.Component {
  static propTypes = {
    fetchApps: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
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
    const { match, isEventsLoading, isFetchingAppsLoading } = this.props;
    if (isFetchingAppsLoading || isEventsLoading) {
      return null;
    }
    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:appId`} render={({ match }) => {
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
          }} />
          <Route exact path={match.path}>
            <Container>
              <Row className="pt-4 pb-3">
                <Col>
                  <h3>Applications managed by HyperPilot</h3>
                </Col>
              </Row>
              <Row>
                <DashboardAppsTable
                  {..._.pick(this.props, ["apps", "incidents", "risks", "opportunities"])}
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
  setup: { apps, ui: { isFetchingAppsLoading } },
  diagnosis: { incidents, risks, opportunities, ui: { isEventsLoading } },
}) => ({
  apps,
  incidents,
  risks,
  opportunities,
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
