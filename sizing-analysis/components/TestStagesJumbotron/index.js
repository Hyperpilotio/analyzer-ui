import React from "react";
import Container from "../../../commons/components/Container";
import styles from "./index.scss";

const TestStagesJumbotron = () => (
  <div className={styles.TestStagesJumbotron}>
    <Container className={styles.Container}>
      <div className={styles.Intro}>
        <h3>Initial Benchmark Test</h3>
        <p>Connect existing apps from cluster managers to run analyzer</p>
      </div>
    </Container>
  </div>
);

export default TestStagesJumbotron;
