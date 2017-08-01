import React from "react";
import Container from "../../../commons/components/Container";
import styles from "./index.scss";

const TestStagesJumbotron = ({ children }) => (
  <div className={styles.TestStagesJumbotron}>
    <Container>
      { children }
    </Container>
  </div>
);

export default TestStagesJumbotron;
