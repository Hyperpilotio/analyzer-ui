import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import {
  Container, Row, Col,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Alert,
} from "reactstrap";
import { Toggle } from "react-powerplug";
import FaCaretDown from "react-icons/lib/fa/caret-down";
import PropTypes from "prop-types";
import ReactTimeout from "react-timeout";
import Linked from "~/commons/components/Linked";
import DiagnosticsTable from "../components/DiagnosticsTable";
import RemediationsTable from "./RemediationsTable";
import ChartGroup from "../components/ChartGroup";
import SLOGraph from "../components/SLOGraph";
import SingleResourceGraph from "../components/SingleResourceGraph";
import InterferenceGraph from "../components/InterferenceGraph";
import { ProblemDescription, ResourceGraphTitle } from "../components/TextDescriptions";
import { AutoBreadcrumbItem } from "./AutoBreadcrumb";
import { fetchDiagnosis } from "../actions";
import { tsToMoment } from "../lib/utils";

const mapStateToProps = ({ applications, ui, diagnosis }, { app, match }) => {
  const incident = _.find(diagnosis.incidents, { incident_id: match.params.incidentId });
  if (_.isEmpty(incident)) {
    return { incident: null, result: null, problems: null, isDiagnosticsLoading: true };
  }
  const result = _.find(diagnosis.results, { incident_id: incident.incident_id });
  if (_.isEmpty(result)) {
    return { incident: null, result: null, problems: null, isDiagnosticsLoading: true };
  }
  const problems = result.top_related_problems.map(
    ({ id }) => _.find(diagnosis.problems, { problem_id: id }),
  );

  return { incident, result, problems, isDiagnosticsLoading: false };
};

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  fetchDiagnosis: () => dispatch(fetchDiagnosis(params.appId, params.incidentId)),
});

@connect(mapStateToProps, mapDispatchToProps)
@ReactTimeout
export default class IncidentDiagnosis extends React.Component {
  static propTypes = {
    fetchDiagnosis: PropTypes.func.isRequired,
    isDiagnosticsLoading: PropTypes.bool.isRequired,
    setTimeout: PropTypes.func.isRequired,
    refreshInterval: PropTypes.number,
  }

  static defaultProps = {
    refreshInterval: 30 * 1000,
  }

  componentWillMount() {
    this.refetchDiagnosis();
  }

  async refetchDiagnosis() {
    await this.props.fetchDiagnosis();
    this.props.setTimeout(::this.refetchDiagnosis, this.props.refreshInterval);
  }

  render() {
    const {
      isAppLoading, isDiagnosticsLoading,
      app, result, incident, problems, match,
    } = this.props;
    const incidentTime = incident && tsToMoment(incident.timestamp);
    return (
      <div>
        {isDiagnosticsLoading ? <AutoBreadcrumbItem link={match.url} text="Loading..." /> : null}
        {isDiagnosticsLoading ? null : (
          <div>
            <AutoBreadcrumbItem
              link={match.url}
              text={`${incident.type} (${incidentTime.fromNow()})`}
            />

            <Container className="clearfix mb-3">
              <Row>
                <Col className="mr-auto" sm="auto">
                  <h3 className="mb-3">Diagnosis Result of SLO Violation Incident</h3>
                </Col>
                <Col sm="auto">
                  <p className="text-muted">Time: { incidentTime.format("lll") }</p>
                </Col>
              </Row>
              { incident.state === "Resolved"
                ? <Row>
                    <Col>
                      <Alert color="success">This incident has been resolved!</Alert>
                    </Col>
                  </Row>
                : null
              }
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
              render={({ match: { path, params: { problemId } } }) => {
                const problem = _.find(problems, { problem_id: problemId });
                const diagnosisProblemRef = _.find(result.top_related_problems, { id: problemId });
                return (
                  <Container>
                    <AutoBreadcrumbItem link={path.url} text={`Problem #${diagnosisProblemRef.rank}`} />
                    <Row className="mb-3">
                      <Toggle initial={false}>
                        {({ on, toggle }) => (
                          <Dropdown isOpen={on} toggle={toggle}>
                            <DropdownToggle color="outline-dark">
                                <Row>
                                  <Col className="pr-0" sm="auto">
                                    Problem #{diagnosisProblemRef.rank}:
                                  </Col>
                                  <Col>
                                    <ProblemDescription problem={problem} />
                                    <FaCaretDown className="ml-1" />
                                  </Col>
                                </Row>
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
                  <SLOGraph
                    slo={app.slo}
                    timeRange={[incidentTime.clone().subtract(10, "m"), incidentTime]}
                  />
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
