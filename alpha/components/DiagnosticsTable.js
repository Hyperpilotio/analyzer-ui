import React from "react";
import _ from "lodash";
import { Container, Row, Col, Table } from "reactstrap";
import Linked from "~/commons/components/Linked";

const DiagnosticsTable = ({ baseUrl, result, problems }) => (
  <Container>
    <Row className="mb-2"><h4>Diagnostics:</h4></Row>
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
            const problem = _.find(problems, { problem_id: id });
            return (
              <Linked tag="tr" key={id} to={`${baseUrl}/${id}`}>
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
);

export default DiagnosticsTable;
