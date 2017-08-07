import React from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import styles from "./index.scss";


export default ({ className = "", activeClassName = "", to, text, children }) => (
  <NavLink to={to}
           className={`${styles.NavItemLink} ${className}`}
           activeClassName={`${styles.selected} ${activeClassName}`}>
    { _.isUndefined(children) ? text : children }
  </NavLink>
)
