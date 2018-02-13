import React from "react";
import { connect } from "react-redux";
// import _ from "lodash";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Row, Table } from "reactstrap";
import _s from "./style.scss";
import { resultPageHeader } from "../constants/tempData";

/* eslint-disable */
// @connect(mapStateToProps, mapDispatchToProps)
/* eslint-enable */
/* eslint-disable */
export default class EntryPage extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        {/* TAB */}
        <Row>
          <NavLink to="/result/container/cpu" activeClassName={_s.active} className={_s.tab} >CPU</NavLink>
          <NavLink to="/result/container/memory" activeClassName={_s.active} className={_s.tab} >Memory</NavLink>
        </Row>
        {/* TABLE */}
        <Row>
          <Table bordered hover>
            <thead>
              <tr>
                <th>App label</th>
                <th>Image label</th>
                <th>Username</th>
                <th>Current Request</th>
                <th>Suggested Request</th>
                <th>Current Limit</th>
                <th>Suggested Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}
/* eslint-enable */
