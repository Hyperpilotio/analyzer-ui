import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { format } from "d3-format";
import { Container, Row, Col, Table } from "reactstrap";
import Linked from "~/commons/components/Linked";
import { ProblemDescription } from "./TextDescriptions";
import * as HPPropTypes from "../constants/propTypes";

const DiagnosticsTable = ({ baseUrl, result, problems }) => (
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
          {result.top_related_problems.map(({ id, rank }) => {
            const problem = _.find(problems, { problem_id: id });
            return (
              <Linked tag="tr" key={id} to={`${baseUrl}/${id}`}>
                <th scope="row">{ rank }</th>
                <td>
                  <Row>
                    <ProblemDescription problem={problem} />
                  </Row>
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

DiagnosticsTable.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  result: HPPropTypes.result.isRequired,
  problems: PropTypes.arrayOf(HPPropTypes.problem).isRequired,
};

export default DiagnosticsTable;
