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
  tasksProgress = [],
  progress = 100,
  remainingTime = 0,
  finished = false,
  className = ""
}) => (
  <div className={`${styles.RunnerModal} ${className}`}>

    <div className={styles.RunnerHeader}>
<<<<<<< HEAD
    <img className={styles["RunnerHeader-logo"]}src={mongoLogo} /> mongoDB
    running
=======
      <img className={styles["RunnerHeader-logo"]} src={mongoLogo} />
      mongoDB running
>>>>>>> origin/progress-modal
    </div>

    {/* progress bar*/}
    <div className={styles.progressbar}>
      <ProgressBar percent={progress} />
<<<<<<< HEAD

      {/* <p>{ finished ? "42 mins left" : `${remainingTime}mins left` }</p>*/}
    </div>


    {/* instance info*/}
    <div className={styles["instance-progress-type"]}>

    <div className={styles["instance-progress-type-status"]}>Status</div>
    <div className={styles["instance-progress-type-perf"]}>Perf</div>
    <div className={styles["instance-progress-type-cost"]}>Cost</div>
        <div className={styles["instance-progress-type-perfcost"]}>Perf/Cost</div>
    </div>

=======
    </div>


    {/* instance info*/}
    <div className={styles["instance-progress-type"]}>

    <div className={styles["instance-progress-type-status"]}>Status</div>
    <div className={styles["instance-progress-type-perf"]}>Perf</div>
    <div className={styles["instance-progress-type-cost"]}>Cost</div>
        <div className={styles["instance-progress-type-perfcost"]}>Perf/Cost</div>
    </div>

>>>>>>> origin/progress-modal
    {/* instance run*/}
    <div className={styles["completion-status-group-canvas"]}>
    <ul className={styles["completion-status-group"]}>
      { tasksProgress.map( ({ status, instance, time }) => (
        <ProgressItem status={status} instance={instance} runningTime={time} />
      ) ) }
    </ul>
    </div>


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
