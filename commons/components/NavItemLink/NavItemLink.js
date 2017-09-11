import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import styles from "./NavItemLink.scss";


const NavItemLink = ({ to, text, children, className, activeClassName, activeStyle }) => (
  <NavLink
    to={to}
    className={`${styles.NavItemLink} ${className}`}
    activeClassName={`${styles.selected} ${activeClassName}`}
    activeStyle={activeStyle}
  >
    { _.isUndefined(children) ? text : children }
  </NavLink>
);

NavItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  activeStyle: stylePropType,
};

NavItemLink.defaultProps = {
  text: undefined,
  children: undefined,
  className: "",
  activeClassName: "",
  activeStyle: {},
};

export default NavItemLink;
