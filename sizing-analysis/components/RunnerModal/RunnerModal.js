import React from "react";
import FaCheck from "react-icons/lib/fa/check";
import FaRefresh from "react-icons/lib/fa/refresh";
import { Link } from "react-router-dom";
import ProgressBar from "commons/components/ProgressBar";
import ProgressItem from "../ProgressItem";
import Button from "commons/components/Button";
import styles from "./index.scss";
import mongoLogo from "assets/images/asset_mongoDB_logo.svg";


const RunnerModal = ({
  data,
  progress = 100,
  remainingTime = 0,
  className = ""
}) => (
  <div className={`${styles.RunnerModal} ${className}`}>

    <div className={styles.RunnerHeader}>
      <img className={styles["RunnerHeader-logo"]} src={mongoLogo} />
      mongoDB running
    </div>

    {/* progress bar*/}
    <div className={styles.progressbar}>
      <ProgressBar percent={progress} />
    </div>


    {/* instance info*/}
    <div className={styles["instance-progress-type"]}>

    <div className={styles["instance-progress-type-status"]}>Status</div>
    <div className={styles["instance-progress-type-perf"]}>Perf</div>
    <div className={styles["instance-progress-type-cost"]}>Cost</div>
        <div className={styles["instance-progress-type-perfcost"]}>Perf/Cost</div>
    </div>

    {/* instance run*/}
    <div className={styles["completion-status-group-canvas"]}>
    <ul className={styles["completion-status-group"]}>
      {
        data.sizingRuns.map(({ results }) => (
          results.map(result => (
            <ProgressItem {...result} />
          )
        )))
      }
    </ul>
    </div>


    <div className={styles["button-to-result"]}>
      <Link to="/sizing-test/result" className={`${styles.Button} ${data.status === "complete" ? "" : styles.disabled}`}>
        See Results
      </Link>
    </div>
  </div>
);

export default RunnerModal;
