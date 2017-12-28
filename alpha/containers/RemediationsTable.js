import React from "react";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { RemediationDescription } from "../components/TextDescriptions";

const RemediationsTable = ({ problem, remediations }) => (
  <Container>
    <Row className="mb-2">
      <Col>
        <h4>Recommended Remediations:</h4>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table>
          <thead>
            <tr>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {remediations.map((option, i) => (
              <tr key={i}>
                <td><RemediationDescription option={option} /></td>
                <td><Button disabled>Execute</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>
);

export default RemediationsTable;
