import React from "react";
import _ from "lodash";
import moment from "moment";
import { Switch, Route } from "react-router";
import { Row, Col, Table, Badge, Jumbotron, Container } from "reactstrap";
import Linked from "~/commons/components/Linked";
import SLOGraph from "../components/SLOGraph";
import SingleResourceGraph from "../components/SingleResourceGraph";
import InterferenceGraph from "../components/InterferenceGraph";
import { getSLODisplay } from "../lib/utils";

const getBadge = (incidents, opportunities) => {
  if (!_.isEmpty(incidents)) {
    return <Badge color="danger"><h6 className="mb-0">Incidents</h6></Badge>;
  } else if (!_.isEmpty(opportunities)) {
    return <Badge color="success"><h6 className="mb-0">Opportunities</h6></Badge>;
  }
  return <Badge color="secondary"><h6 className="mb-0">OK</h6></Badge>;
};

const ManagedAppPage = ({ match, app, result, incident, problems }) => (
  <div>
    <Jumbotron className="border border-right-0 border-left-0 bg-white" fluid>
      <Container>
        <Row>
          <Col className="d-flex flex-column justify-content-between" md={4}>
            <h3 className="text-dark">{ app.name }</h3>
            <div>
              <span className="text-muted d-block">SLO</span>
              <h5 className="text-dark">{ getSLODisplay(app.slo) }</h5>
            </div>
          </Col>
          <Col>
            <Row className="mb-3">
              <Col md={3}>
                <span className="text-muted d-block">Detected</span>
                { getBadge(incident) }
              </Col>
              <Col md={3}>
                <span className="text-muted">Services</span>
                <h5 className="text-dark">{ app.microservices.length }</h5>
              </Col>
              <Col md={3}>
                <span className="text-muted">State</span>
                <h5 className="text-dark">{ app.state }</h5>
              </Col>
              <Col md={3}>
                <span className="text-muted">Type</span>
                <h5 className="text-dark">{ app.type }</h5>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span className="text-muted">Interference Management</span>
                <h5 className="text-dark">{ _.find(app.management_features, { name: "interference_management" }).status }</h5>
              </Col>
              <Col md={4}>
                <span className="text-muted">Bottleneck Management</span>
                <h5 className="text-dark">{ _.find(app.management_features, { name: "bottleneck_management" }).status }</h5>
              </Col>
              <Col md={4}>
                <span className="text-muted">Effeciency Management</span>
                <h5 className="text-dark">{ _.find(app.management_features, { name: "efficiency_management" }).status }</h5>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
    <Container className="mb-3">
      <SLOGraph
        app={app}
        timeRange={[
          moment(incident.timestamp),
          moment(incident.timestamp).subtract(incident.duration, "ms"),
        ]}
      />
    </Container>
    <Switch>
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
      <Route path={match.path}>
        <Container>
          <Row className="mb-2">
            <h4>Diagnostics:</h4>
          </Row>
          <Row>
            <Table hover>
              <thead>
                <tr>
                  <th>Problem #</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {result.top_related_problems.map(({ id }, i) => {
                  const problem = _.find(problems, { id });
                  return (
                    <Linked tag="tr" key={id} to={`${match.url}/${id}`}>
                      <th scope="row">#{ i + 1 }</th>
                      <td>{ problem.type }</td>
                      <td>PLACEHOLDER</td>
                    </Linked>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </Route>
    </Switch>
  </div>
);

export default ManagedAppPage;
