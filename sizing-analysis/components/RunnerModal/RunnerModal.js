import React from "react";
import FaCheck from "react-icons/lib/fa/check";
import FaRefresh from "react-icons/lib/fa/refresh";
import { Link } from "react-router-dom";
import ProgressBar from "commons/components/ProgressBar";
import ProgressItem from "../ProgressItem";
import Button from "commons/components/Button";
import styles from "./index.scss";

const RunnerModal = ({
  tasksProgress = [],
  progress = 100,
  remainingTime = 0,
  finished = false,
  className = ""
}) => (
  <div className={`${styles.RunnerModal} ${className}`}>
    <h3>Running sizing analysis...</h3>
    <div className={styles.progressbar}>
      <ProgressBar percent={progress} />
      <p>{ finished ? "Done!" : `${remainingTime}mins left` }</p>
    </div>
    <ul className={styles["completion-status-group"]}>
      { tasksProgress.map( ({ status, instance, time }) => (
        <ProgressItem status={status} instance={instance} runningTime={time} />
      ) ) }
    </ul>
    { finished ? (
      <div className={styles["button-to-result"]}>
        <Link to="/sizing-test/result" className={styles.Button}>
          See Results
        </Link>
      </div>
    ) : null }
  </div>
);

export default RunnerModal;