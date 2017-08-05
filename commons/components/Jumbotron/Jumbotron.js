import React from "react";
import Container from "../Container";
import styles from "./index.scss";

const Jumbotron = ({ className = "", containerClassName = "", children }) => (
  <div className={`${styles.Jumbotron} ${className}`}>
    <Container className={`${styles.Container} ${containerClassName}`}>
      { children }
    </Container>
  </div>
);

export default Jumbotron;
