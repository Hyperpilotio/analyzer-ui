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
import { ProblemDescription } from "../components/TextDescriptions";
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
              <h3 className="mb-3">Diagnosis Result of SLO Violation Incident</h3>
              <p className="text-muted">Time: { moment(incident.timestamp / (1000 ** 2)).format("lll") }</p>
              <SLOGraph incident={incident} />
            </Container>

            <Route
              path={`${match.path}/:problemId`}
              render={({ match: { params: { problemId } } }) => {
                const problem = _.find(problems, { problem_id: problemId });
                return (
                  <Container>
                    <Row className="mb-2">
                      <Col sm="auto">
                        <h5>Problem #{_.find(result.top_related_problems, { id: problemId }).rank}:</h5>
                      </Col>
                      <Col>
                        <ProblemDescription problem={problem} />
                      </Col>
                    </Row>
                    {problem.metrics.map(metric => (
                      <Row key={metric.name} className="mb-2">
                        <Col>
                          <SingleResourceGraph
                            height={problem.metrics.length > 1 ? 300 : 400}
                            problem={problem}
                            metric={metric}
                          />
                        </Col>
                      </Row>
                    ))}
                  </Container>
                );
              }}
            />

            <Route
              path={`${match.path}/:problemId?`}
              render={({ match: { params } }) => (
                <DiagnosticsTable
                  selectedProblem={params.problemId}
                  baseUrl={match.url}
                  result={result}
                  problems={problems}
                />
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ applications, ui, diagnosis }, { match }) => {
  const isAppLoading = _.isEmpty(applications) || ui.isFetchAppsLoading;
  if (isAppLoading) {
    return { isAppLoading, isDiagnosticsLoading: true };
  }

  const app = _.find(applications, { app_id: match.params.appId });
  const appIncidents = _.filter(diagnosis.incidents, { labels: { app_name: app.name } });
  const isDiagnosticsLoading = ui.isFetchDiagnosticsLoading || _.isEmpty(appIncidents);
  if (isDiagnosticsLoading) {
    return { app, isAppLoading, isDiagnosticsLoading };
  }

  const mostRecentIncident = _.maxBy(appIncidents, "timestamp");
  const result = _.find(diagnosis.results, { incident_id: mostRecentIncident.incident_id });
  const problems = result.top_related_problems.map(
    ({ id }) => _.find(diagnosis.problems, { problem_id: id }),
  );
  return { app, incident: mostRecentIncident, result, problems };
};

const mapDispatchToProps = (dispatch, { match }) => ({
  fetchDiagnostics: () => dispatch(fetchDiagnostics(match.params.appId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDiagnosis);
