import React from "react";
import { connect } from "react-redux";
// import _ from "lodash";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Row } from "reactstrap";
import _s from "./style.scss";

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
        <Row>
          <NavLink to="/result/container/cpu" activeClassName={_s.active} className={_s.navLi} >CPU</NavLink>
          <NavLink to="/result/container/memory" activeClassName={_s.active} className={_s.navLi} >Memory</NavLink>
        </Row>
      </div>
    );
  }
}
/* eslint-enable */
