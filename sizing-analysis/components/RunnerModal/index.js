import React from "react";
import FaCheck from "react-icons/lib/fa/check";
import FaRefresh from "react-icons/lib/fa/refresh";
import styles from "./index.scss";

const sampleProgress = [
  { status: "completed", instance: "C3.large", time: 25 },
  { status: "completed", instance: "C3.xlarge", time: 21 },
  { status: "completed", instance: "M2.xlarge", time: 10 },
  { status: "pending", instance: "M2.large", time: 5 }
];

const RunnerModal = () => (
  <div className={styles.RunnerModal}>
    <h3>Running sizing analysis...</h3>
    <div className={styles["progressbar-area"]}>
      <div className={styles["progressbar-container"]}>
        <div className={styles["progressbar"]} />
      </div>
      <p>20mins left</p>
    </div>
    <ul className={styles["completion-status-group"]}>
      { sampleProgress.map( ({ status, instance, time }) => (
        <li className={styles["completion-status"]}>
          <div className={styles["instance-name"]}>
            { status === "completed"
              ? <FaCheck className={`${styles.checkmark} ${styles.completed}`} size={18} />
              : <FaRefresh className={`${styles.checkmark} ${styles.running}`} size={18} /> }
            
            <p className={styles[status]}>
              <span className={styles["instance-type"]}>{ instance }</span> instance
            </p>
          </div>
          <div className={styles["running-time"]}>
            <p className={styles[status]}>{ time } mins</p>
          </div>
        </li>
      ) ) }
    </ul>
  </div>
);

export default RunnerModal;
