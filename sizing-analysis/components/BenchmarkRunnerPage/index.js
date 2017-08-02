import React from "react";
import TestStagesJumbotron from "../TestStagesJumbotron";
import AppSelector from "../AppSelector";
import Container from "commons/components/Container";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./index.scss";

const BenchmarkRunnerPage = () => (
  <div className={styles.BenchmarkRunnerPage}>
    <TestStagesJumbotron stage={STAGE_CONFIG} />
    <main>
      <Container className={styles.Container}>
        <div>
          <h3>Existing Apps</h3>
          <div className={styles["cluster-info"]}>
            <p>Cluster manager</p>
            <h3>AWS EC2</h3>
          </div>
          <div className={styles["cluster-info"]}>
            <p>Service ID</p>
            <h3>3902b203af</h3>
          </div>
          <div className={styles["cluster-info"]}>
            <p>Total apps running</p>
            <h3>6</h3>
          </div>
        </div>
        <div>
          <AppSelector />
        </div>
      </Container>
    </main>
  </div>
);

export default BenchmarkRunnerPage;
