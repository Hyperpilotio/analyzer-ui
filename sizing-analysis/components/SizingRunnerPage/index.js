import React from "react";
import TestStagesJumbotron from "../TestStagesJumbotron";
import AppSelector from "../AppSelector";
import RunnerModal from "../RunnerModal";
import Container from "commons/components/Container";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./index.scss";

const sampleProgress = [
  { status: "completed", instance: "C3.large", time: 25 },
  { status: "completed", instance: "C3.xlarge", time: 21 },
  { status: "completed", instance: "M2.xlarge", time: 10 },
  { status: "running", instance: "M3.large", time: 15 },
  { status: "running", instance: "G4.large", time: 9 },
  { status: "running", instance: "G3.xlarge", time: 20 }
];

const SizingRunnerPage = ({ stage = STAGE_CONFIG }) => {
  let modalElement = stage !== STAGE_TEST ? "" : (
    <div className={styles["modal-container"]}>
      <RunnerModal
        tasksProgress={sampleProgress}
        progress={60}
        remainingTime={20}
        finished />
    </div>
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
      { modalElement }
    </main>
  </div>
};

export default SizingRunnerPage;
