import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import _s from "./style.scss";
import * as HPPropTypes from "../../constants/propTypes";

/* eslint-disable react/prefer-stateless-function */
class SideNav extends Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    navData: PropTypes.arrayOf(HPPropTypes.sideNavItem).isRequired,
  }

  render() {
    const {
      navData,
      match,
    } = this.props;
    return (
      <div className={_s.comp}>
        <ul className={_s.container}>
          {
            navData.map(d => (
              d.isLink ?
                <li key={d.key} className={_s.navLi}>
                  <div className={_s.iconContainer}>
                    <img className={_s.icon} alt="" src={d.icon} />
                  </div>
                  <Link
                    to={d.url}
                    className={`side-nav-li-${d.type} ${match.url === d.url ? "active" : ""}`}
                  >
                    {d.text}
                  </Link>
                </li>
                :
                <li key={d.key} className={_s.navLi}>
                  <h5
                    className={`side-nav-li-${d.type} ${d.active ? "active" : ""}`}
                  >
                    {d.text}
                  </h5>
                </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

/* eslint-disable */

export default withRouter(SideNav);
