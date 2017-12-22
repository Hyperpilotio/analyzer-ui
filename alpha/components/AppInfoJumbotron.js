import React from "react";
import _ from "lodash";
import { Container, Row, Col, Jumbotron, Badge } from "reactstrap";
import { getSLODisplay, getProblemType } from "../lib/utils";
import FaTimesCircle from "react-icons/lib/fa/times-circle";

const getBadge = (incidents, opportunities) => {
  if (!_.isEmpty(incidents)) {
    return <Badge color="danger"><h6 className="mb-0">Incidents</h6></Badge>;
  } else if (!_.isEmpty(opportunities)) {
    return <Badge color="success"><h6 className="mb-0">Opportunities</h6></Badge>;
  }
  return <Badge color="secondary"><h6 className="mb-0">OK</h6></Badge>;
};

const AppInfoJumbotron = ({ app }) => (
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
              { getBadge(" ") }
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
);

export default AppInfoJumbotron;
