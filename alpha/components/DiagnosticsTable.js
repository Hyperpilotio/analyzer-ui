import React from "react";
import _ from "lodash";
import { format } from "d3-format";
import { Container, Row, Col, Table } from "reactstrap";
import Linked from "~/commons/components/Linked";
import ProblemDescription from "./ProblemDescription";

const numFormat = format(".2f");

const DiagnosticsTable = ({ baseUrl, result, problems }) => (
  <Container>
    <Row className="mb-2"><h4>Diagnostics:</h4></Row>
    <Row>
      <Table hover>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Correlation</th>
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
                <td>{ numFormat(problem.analysis_result.severity) }%</td>
                <td>{ numFormat(problem.analysis_result.correlation) }</td>
                <td>{ numFormat(problem.analysis_result.score) }%</td>
              </Linked>
            );
          })}
        </tbody>
      </Table>
    </Row>
  </Container>
);

export default DiagnosticsTable;
