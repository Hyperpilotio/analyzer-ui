import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { RemediationDescription } from "../components/TextDescriptions";
import * as HPPropTypes from "../constants/propTypes";

const RemediationsTable = ({ remediations }) => (
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
              // eslint-disable-next-line react/no-array-index-key
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

RemediationsTable.propTypes = {
  remediations: PropTypes.arrayOf(HPPropTypes.remediationOption).isRequired,
};

export default RemediationsTable;
