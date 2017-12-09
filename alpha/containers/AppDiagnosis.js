import React from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import { Row, Col, Table, Badge, Jumbotron, Container } from "reactstrap";
import Linked from "~/commons/components/Linked";
import AppInfoJumbotron from "../components/AppInfoJumbotron";
import DiagnosticsTable from "../components/DiagnosticsTable";
import SLOGraph from "../components/SLOGraph";
import SingleResourceGraph from "../components/SingleResourceGraph";
import InterferenceGraph from "../components/InterferenceGraph";
import { fetchDiagnostics } from "../actions";


class AppDiagnosis extends React.Component {
  componentWillMount() {
    this.props.fetchDiagnostics();
  }

  render() {
    const {
      isAppLoading, isDiagnosticsLoading,
      app, result, incident, problems, match,
    } = this.props;

    return (
      <div>
        {isAppLoading ? null : <AppInfoJumbotron app={app} />}
        {isDiagnosticsLoading ? null : (
          <div>
            <Container className="mb-3">
              <SLOGraph
                app={app}
                timeRange={[
                  incident.timestamp - 300 * 1000 ** 3,
                  incident.timestamp,
                ]}
              />
            </Container>

            <Switch>
              <Route
                exact path={match.path}
                render={({ match }) => (
                  <DiagnosticsTable baseUrl={match.url} result={result} problems={problems} />
                )}
              />

              <Route
                path={`${match.path}/:problemId`}
                render={({ match: { params: { problemId } } }) => (
                  <Container>
                    <Row className="mb-2">
                      <SingleResourceGraph
                        eventDoc={{
                          metric_name: "intel/docker/stats/cgroups/blkio_stats/io_serviced_recursive/value",
                          threshold: {
                            type: "UB",
                            value: 700,
                          },
                        }}
                      />
                      <InterferenceGraph />
                    </Row>
                    <Row className="mb-2">
                      <h4 className="text-dark">{ problemId }: Resource type <Badge>memory</Badge> saturating on node <Badge>node-1</Badge></h4>
                    </Row>
                    <Row>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Remediation #</th>
                            <th>Description</th>
                            <th>Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#1</td>
                            <td>Move container <Badge>goddd</Badge> to node <Badge>node-1</Badge></td>
                            <td>Semi-Auto</td>
                          </tr>
                          <tr>
                            <td>#2</td>
                            <td>
                              Throttle request type <Badge>net</Badge> on container <Badge>goddd</Badge>
                            </td>
                            <td>Semi-Auto</td>
                          </tr>
                          <tr>
                            <td>#3</td>
                            <td>
                              Resize node <Badge>node-1</Badge> to instance type <Badge>t2.xlarge</Badge>
                            </td>
                            <td>Manual</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Row>
                  </Container>
                )}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ applications: { apps }, ui, diagnosis }, { match }) => {
  const isAppLoading = _.isEmpty(apps) || ui.isFetchAppsLoading;
  if (isAppLoading) {
    return { isAppLoading, isDiagnosticsLoading: true };
  }

  const app = _.find(apps, { app_id: match.params.appId });
  const appIncidents = _.filter(diagnosis.incidents, {labels: {app_name: app.name}});
  const isDiagnosticsLoading = ui.isFetchDiagnosticsLoading || _.isEmpty(appIncidents);
  if (isDiagnosticsLoading) {
    return { app, isAppLoading, isDiagnosticsLoading };
  }

  const mostRecentIncident = _.maxBy(appIncidents, "timestamp");
  const result = _.find(diagnosis.results, { incident_id: mostRecentIncident.incident_id });
  const problems = result.top_related_problems.map(
    ({ id }) => _.find(diagnosis.problems, { problem_id: id })
  );
  return { app, incident: mostRecentIncident, result, problems };
};

const mapDispatchToProps = (dispatch, { match }) => ({
  fetchDiagnostics: () => dispatch(fetchDiagnostics(match.params.appId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDiagnosis);
