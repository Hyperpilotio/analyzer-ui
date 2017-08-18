import React from "react";
import FaCheck from "react-icons/lib/fa/check";
import FaRefresh from "react-icons/lib/fa/refresh";
import styles from "./index.scss";

const ProgressItem = ({ status, instance, runningTime }) => (
  <li className={`${styles.ProgressItem} ${styles[status]}`}>
    <div className={styles["instance-type"]}>
      {
        status === "completed"
          ? <FaCheck className={`${styles.checkmark}`} size={18} />
          : <FaRefresh className={`${styles.checkmark}`} size={18} />
      }
      <p>
        <mark>{ instance }</mark>
      </p>
    </div>
    <div className={styles["running-time"]}>
      <p>{ runningTime } mins</p>
    </div>

    <div className={styles["running-time"]}>
      <p>{ runningTime } mins</p>
    </div>

    <div className={styles["running-time"]}>
      <p>{ runningTime } mins</p>
    </div>

  </li>
);

export default ProgressItem;
