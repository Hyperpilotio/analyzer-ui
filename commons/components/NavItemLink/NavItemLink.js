import React from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import styles from "./NavItemLink.scss";


export default ({ activeStyle="", className = "", activeClassName = "", to, text, children }) => (
  <NavLink to={to}
           className={`${styles.NavItemLink} ${className}`}
           activeClassName={`${styles.selected} ${activeClassName}`}
           activeStyle={activeStyle}>
    { _.isUndefined(children) ? text : children }
  </NavLink>
)
