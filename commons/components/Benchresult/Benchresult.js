import React from "react";
import Container from "../Container";
import styles from "./index.scss";

const Benchresult = ({ className = "", containerClassName = "", children }) => (
  <div className={`${styles.Benchresult} ${className}`}>
    <Container className={`${styles.Container} ${containerClassName}`}>
      { children }
    </Container>
  </div>
);

export default Benchresult;
