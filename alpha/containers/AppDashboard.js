import React from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, } from "reactstrap";
import ReactTimeout from "react-timeout";
import AppInfoJumbotron from "../components/AppInfoJumbotron";
import ChartGroup from "../components/ChartGroup";
import SLOGraph from "../components/SLOGraph";
import IncidentDiagnosis from "./IncidentDiagnosis";
import { fetchAppLatestIncident } from "../actions";
import { withAutoBreadcrumb, AutoBreadcrumbItem } from "./AutoBreadcrumb";
import { tsToMoment } from "../lib/utils";


const mapStateToProps = ({ applications, ui, diagnosis }, { match }) => {
  const isAppLoading = _.isEmpty(applications);
  if (isAppLoading) {
    return { app: null, latestIncident: null, isAppLoading, isIncidentLoading: true };
  }

  const app = _.find(applications, { app_id: match.params.appId });

  const isIncidentLoading = ui.isFetchAppLatestIncidentLoading;
  const appIncidents = _.filter(diagnosis.incidents, { labels: { app_name: app.name } });
  if (_.isEmpty(appIncidents)) {
    return { app, latestIncident: null, isAppLoading, isIncidentLoading };
  }

  const latestIncident = _.maxBy(appIncidents, "timestamp");
  return { app, latestIncident, isAppLoading, isIncidentLoading };
};

const mapDispatchToProps = (dispatch, { match }) => ({
  fetchAppLatestIncident: () => dispatch(fetchAppLatestIncident(match.params.appId)),
});

@connect(mapStateToProps, mapDispatchToProps)
@ReactTimeout
@withAutoBreadcrumb
export default class AppDashboard extends React.Component {

  static defaultProps = {
    refreshInterval: 30 * 1000,
  }

  componentWillMount() {
    this.refetchIncident();
  }

  async refetchIncident() {
    await this.props.fetchAppLatestIncident();
    this.props.setTimeout(::this.refetchIncident, this.props.refreshInterval);
  }

  render() {
    const { match, isAppLoading, app, isIncidentLoading, latestIncident } = this.props;
    if (isAppLoading) {
      return <div />;
    }
    return (
      <div>
        <AppInfoJumbotron app={app} />
        <div>
          <Container>{ this.props.breadcrumb }</Container>
          <AutoBreadcrumbItem link="/dashboard" text="Apps" />
          <AutoBreadcrumbItem link={match.url} text={app.name} />

          <Route exact path={match.url} render={() => (
            <Container className="mb-4">
              <Row className="mb-2">
                <Col>
                  {!isIncidentLoading && _.isNull(latestIncident) ? <h5>{ app.name } is currently healthy</h5> : null}
                  {isIncidentLoading && _.isNull(latestIncident) ? <h5>Loading...</h5> : null}
                  {_.get(latestIncident, "state") === "Active" ? (
                    <h5>
                      <Link to={`${match.url}/incidents/${latestIncident.incident_id}`}>
                        View the current incident: { latestIncident.type } ({ tsToMoment(latestIncident.timestamp).fromNow() })
                      </Link>
                    </h5>
                  ) : null}
                  {_.get(latestIncident, "state") === "Resolved" ? (
                    <h5>
                      <span className="mr-2">{ app.name } is currently healthy.</span>
                      <Link to={`${match.url}/incidents/${latestIncident.incident_id}`}>
                        View last incident: { latestIncident.type } ({ tsToMoment(latestIncident.timestamp).fromNow() })
                      </Link>
                    </h5>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <ChartGroup>
                  <SLOGraph
                    slo={app.slo}
                    start={moment().subtract(10, "m").tsNano()}
                    end={moment().tsNano()}
                  />
                  <h5 className="text-center mb-3">
                    {_.words(app.slo.metric.type).map(_.capitalize).join(" ")} v.s. SLO
                  </h5>
                </ChartGroup>
              </Row>
            </Container>
          )} />
          <Route
            path={`${this.props.match.path}/incidents/:incidentId`}
            render={({ match }) => <IncidentDiagnosis app={app} match={match} />}
          />
        </div>
      </div>
    );
  }
}
