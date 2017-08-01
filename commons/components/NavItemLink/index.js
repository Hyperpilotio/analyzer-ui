import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.scss";


export default ({ to, text }) => (
  <NavLink to={to}
           className={styles.NavItemLink}
           activeClassName={styles.selected}>
    { text }
  </NavLink>
)
