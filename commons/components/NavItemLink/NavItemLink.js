import React from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import styles from "./NavItemLink.scss";


<<<<<<< HEAD
export default ({ activeStyle="", className = "", activeClassName = "", to, text, children }) => (
=======
export default ({
  to,
  text,
  children,
  className = "",
  activeClassName = "",
  activeStyle = {}
}) => (
>>>>>>> origin/progress-modal
  <NavLink to={to}
           className={`${styles.NavItemLink} ${className}`}
           activeClassName={`${styles.selected} ${activeClassName}`}
           activeStyle={activeStyle}>
    { _.isUndefined(children) ? text : children }
  </NavLink>
)
