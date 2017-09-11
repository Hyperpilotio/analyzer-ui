import React from "react";
import PropTypes from "prop-types";
import Container from "../Container";
import styles from "./Navbar.scss";

const Navbar = ({ className, children }) => (
  <nav className={`${styles.Navbar} ${className}`}>
    <Container className={styles.Container}>
      { children }
    </Container>
  </nav>
);

Navbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Navbar.defaultProps = {
  className: "",
  children: null,
};

export default Navbar;
