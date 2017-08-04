import React from "react";
import FaCheck from "react-icons/lib/fa/check";
import FaRefresh from "react-icons/lib/fa/refresh";
import ProgressBar from "commons/components/ProgressBar";
import ProgressItem from "../ProgressItem";
import styles from "./index.scss";

const sampleProgress = [
  { status: "completed", instance: "C3.large", time: 25 },
  { status: "completed", instance: "C3.xlarge", time: 21 },
  { status: "completed", instance: "M2.xlarge", time: 10 },
  { status: "running", instance: "M3.large", time: 15 },
  { status: "running", instance: "G4.large", time: 9 },
  { status: "running", instance: "G3.xlarge", time: 20 }
];

const RunnerModal = () => (
  <div className={styles.RunnerModal}>
    <h3>Running sizing analysis...</h3>
    <div className={styles.progressbar}>
      <ProgressBar percent={50} />
      <p>20mins left</p>
    </div>
    <ul className={styles["completion-status-group"]}>
      { sampleProgress.map( ({ status, instance, time }) => (
        <ProgressItem status={status} instance={instance} runningTime={time} />
      ) ) }
    </ul>
  </div>
);

export default RunnerModal;
