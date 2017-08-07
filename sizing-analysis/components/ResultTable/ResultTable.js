import React from "react";
import Container from "commons/components/Container";
import styles from "./ResultTable.scss";

const ResultTable = ({ className = "", containerClassName = "", children }) => (
  <div className={`${styles.ResultTable} ${className}`}>
    <Container className={`${styles.Container} ${containerClassName}`}>
      { children }
    </Container>
  </div>
);

export default ResultTable;
