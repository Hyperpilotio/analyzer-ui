import React from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, CardTitle, Table, Badge, Jumbotron, Container } from "reactstrap";
import { Toggle } from "react-powerplug";
import FaCaretDown from "react-icons/lib/fa/caret-down";
import Linked from "~/commons/components/Linked";
import AppInfoJumbotron from "../components/AppInfoJumbotron";
import DiagnosticsTable from "../components/DiagnosticsTable";
import RemediationsTable from "./RemediationsTable";
import ChartGroup from "../components/ChartGroup";
import SLOGraph from "../components/SLOGraph";
import SingleResourceGraph from "../components/SingleResourceGraph";
import InterferenceGraph from "../components/InterferenceGraph";
import { ProblemDescription, ResourceGraphTitle } from "../components/TextDescriptions";
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
            <Container className="clearfix mb-3">
              <h3 className="float-left mb-3">Diagnosis Result of SLO Violation Incident</h3>
              <p className="float-right text-muted">Time: { moment(incident.timestamp / (1000 ** 2)).format("lll") }</p>
            </Container>

            <Route
              exact path={match.path}
              render={({ match: { params } }) => (
                <DiagnosticsTable
                  selectedProblem={params.problemId}
                  baseUrl={match.url}
                  result={result}
                  problems={problems}
                />
              )}
            />

            <Route
              path={`${match.path}/:problemId`}
              render={({ match: { params: { problemId } } }) => {
                const problem = _.find(problems, { problem_id: problemId });
                return (
                  <Container>
                    <Row className="mb-3">
                      <Toggle initial={false}>
                        {({ on, toggle }) => (
                          <Dropdown isOpen={on} toggle={toggle}>
                            <DropdownToggle color="outline-dark">
                              <h5 className="mb-0">
                                <Row>
                                  <Col sm="auto">
                                    Problem #{_.find(result.top_related_problems, { id: problemId }).rank}:
                                  </Col>
                                  <Col>
                                    <ProblemDescription problem={problem} />
                                    <FaCaretDown className="ml-2" />
                                  </Col>
                                </Row>
                              </h5>
                            </DropdownToggle>
                            <DropdownMenu>
                              {_.reject(result.top_related_problems, { id: problemId }).map(relatedProblem => (
                                <DropdownItem key={relatedProblem.id}>
                                  <Linked tag={Row} to={`${match.url}/${relatedProblem.id}`}>
                                    <Col sm="auto">
                                      Problem #{ relatedProblem.rank }:
                                    </Col>
                                    <Col>
                                      <ProblemDescription problem={_.find(problems, { problem_id: relatedProblem.id })} />
                                    </Col>
                                  </Linked>
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        )}
                      </Toggle>
                    </Row>
                    <Row>
                      <ChartGroup className="mb-3">
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
                        <ResourceGraphTitle problem={problem} />
                      </ChartGroup>
                    </Row>
                  </Container>
                );
              }}
            />

            <Container className="mb-4">
              <Row>
                <ChartGroup>
                  <SLOGraph incident={incident} />
                  <h5 className="text-center mb-3">
                    {_.words(app.slo.metric.type).map(_.capitalize).join(" ")} v.s. SLO
                  </h5>
                </ChartGroup>
              </Row>
            </Container>

            <Route
              path={`${match.path}/:problemId`}
              render={({ match: { params: { problemId } } }) => (
                <RemediationsTable
                  problem={_.find(problems, { problem_id: problemId })}
                  remediations={_.find(result.top_related_problems, { id: problemId }).remediation_options}
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
