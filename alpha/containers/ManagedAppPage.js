import React from "react";
import _ from "lodash";
import { Row, Col, Table, Badge, Jumbotron, Container } from "reactstrap";
import { getSLODisplay } from "../utils";

const getBadge = ({ incidents, opportunities }) => {
  if (!_.isEmpty(incidents)) {
    return <Badge color="danger"><h6 className="mb-0">Incidents</h6></Badge>;
  } else if (!_.isEmpty(opportunities)) {
    return <Badge color="success"><h6 className="mb-0">Opportunities</h6></Badge>;
  } else {
    return <Badge color="secondary"><h6 className="mb-0">OK</h6></Badge>;
  }
}

const ManagedAppPage = ({ match, app, incidents, risks, opportunities }) => (
  <div>
    { console.log(match) }
    { console.log(app) }
    { console.log(incidents) }
    { console.log(opportunities) }
    <Jumbotron className="border border-right-0 border-left-0 bg-white" fluid>
      <Container>
        <Row>
          <Col className="d-flex flex-column justify-content-between" md={3}>
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
                { getBadge({ incidents, opportunities }) }
              </Col>
              <Col md={3}>
                <span className="text-muted">Services</span>
                <h5 className="text-dark">{ app.services.length }</h5>
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
                <h5 className="text-dark">{ _.find(app.management_features, { name: "interference_management" }).mode }</h5>
              </Col>
              <Col md={4}>
                <span className="text-muted">Bottleneck Management</span>
                <h5 className="text-dark">{ _.find(app.management_features, { name: "bottleneck_management" }).mode }</h5>
              </Col>
              <Col md={4}>
                <span className="text-muted">Effeciency Management</span>
                <h5 className="text-dark">{ _.find(app.management_features, { name: "efficiency_management" }).mode }</h5>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
    <Container>
      <Row className="mb-2">
        <h4>Diagnostics:</h4>
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Problem #</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">#1</th>
              <td>{ (new Date).toString() }</td>
              <td>Resource type <Badge>memory</Badge> saturating on node <Badge>node-1</Badge></td>
            </tr>
            <tr>
              <th scope="row">#2</th>
              <td>{ (new Date).toString() }</td>
              <td>Resource type <Badge>blkio</Badge> having bottleneck in container <Badge>kafka-serve</Badge></td>
            </tr>
            <tr>
              <th scope="row">#3</th>
              <td>{ (new Date).toString() }</td>
              <td>Resource type <Badge>net</Badge> having contention on node <Badge>node-2</Badge></td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  </div>
);

export default ManagedAppPage;
