import React from "react";
import PropTypes from "prop-types";
import Container from "../Container";
import styles from "./Jumbotron.scss";

const Jumbotron = ({ className, containerClassName, children }) => (
  <div className={`${styles.Jumbotron} ${className}`}>
    <Container className={`${styles.Container} ${containerClassName}`}>
      { children }
    </Container>
  </div>
);

Jumbotron.propTypes = {
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  children: PropTypes.node,
};

Jumbotron.defaultProps = {
  className: "",
  containerClassName: "",
  children: null,
};

export default Jumbotron;
