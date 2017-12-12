import React from "react";
import _ from "lodash";
import { format } from "d3-format";
import { Container, Row, Col, Table } from "reactstrap";
import Linked from "~/commons/components/Linked";
import ProblemDescription from "./ProblemDescription";

const DiagnosticsTable = ({ baseUrl, result, problems }) => (
  <Container className="mt-4">
    <Row className="mb-2">
      <Col><h4>Top Related Problems:</h4></Col>
    </Row>
    <Row>
      <Col>
        <Table hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Description</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {result.top_related_problems.map(({ id, rank }) => {
              const problem = _.find(problems, { problem_id: id });
              return (
                <Linked tag="tr" key={id} to={`${baseUrl}/${id}`}>
                  <th scope="row">{ rank }</th>
                  <td><ProblemDescription problem={problem} /></td>
                  <td>{ format(".2f")(problem.over_score) }</td>
                </Linked>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>
);

export default DiagnosticsTable;
