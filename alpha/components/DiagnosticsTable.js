import React from "react";
import _ from "lodash";
import { format } from "d3-format";
import { Container, Row, Col, Table, Collapse, ListGroup, ListGroupItem } from "reactstrap";
import Linked from "~/commons/components/Linked";
import { ProblemDescription, RemediationDescription } from "./TextDescriptions";

const DiagnosticsTable = ({ selectedProblem, baseUrl, result, problems }) => (
  <Container className="mt-4">
    <Row className="mb-2">
      <Col><h4>Top Related Problems:</h4></Col>
    </Row>
    <Row>
      <Table className="no-padding-adjust" hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Description</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {result.top_related_problems.map(({ id, rank, remediation_options: options }) => {
            const problem = _.find(problems, { problem_id: id });
            return (
              <Linked tag="tr" key={id} to={`${baseUrl}/${id}`}>
                <th scope="row">{ rank }</th>
                <td>
                  <Row>
                    <ProblemDescription problem={problem} />
                  </Row>
                  <Collapse isOpen={id === selectedProblem}>
                    <Row className="mt-3">
                      <h5>Recommended Remediaion Actions:</h5>
                    </Row>
                    <ListGroup>
                      {options.map((option, i) => (
                        // Remediation options are static within a problem, and we also have
                        // nothing else other than index for the key
                        // eslint-disable-next-line react/no-array-index-key
                        <ListGroupItem key={i}>
                          <Row>
                            <Col sm="auto">{i + 1}. </Col>
                            <Col><RemediationDescription option={option} /></Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Collapse>
                </td>
                <td>{ format(".2f")(problem.overall_score) }</td>
              </Linked>
            );
          })}
        </tbody>
      </Table>
    </Row>
  </Container>
);

export default DiagnosticsTable;
