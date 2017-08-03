import React from "react";
import TestStagesJumbotron from "../TestStagesJumbotron";
import AppSelector from "../AppSelector";
import RunnerModal from "../RunnerModal";
import Container from "commons/components/Container";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./index.scss";

const SizingRunnerPage = ({ stage = STAGE_CONFIG }) => {
  let modalElement = stage !== STAGE_TEST ? "" : (
    <RunnerModal />
  );

  return <div className={styles.SizingRunnerPage}>
    <TestStagesJumbotron stage={stage} />
    <main>
      <Container className={styles.Container}>
        <div>
          <h3>Apps</h3>
          <div className={styles["cluster-info"]}>
            <p>Current cluster manager</p>
            <h3>Kubernuets</h3>
          </div>
          <div className={styles["cluster-info"]}>
            <p>TBD</p>
            <h3>TBD info</h3>
          </div>
          <div className={styles["cluster-info"]}>
            <p>TBD Info</p>
            <h3>TBD</h3>
          </div>
        </div>
        <div>
          <AppSelector />
        </div>
      </Container>
    </main>
    { modalElement }
  </div>
};

export default SizingRunnerPage;
