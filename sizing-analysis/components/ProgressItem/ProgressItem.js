import React from "react";
import FaCheck from "react-icons/lib/fa/check";
import FaRefresh from "react-icons/lib/fa/refresh";
import styles from "./ProgressItem.scss";

const ProgressItem = ({ status, nodetype, qosValue, cost, perfOverCost }) => (
  <li className={`${styles.ProgressItem} ${styles[status]}`}>
    <div className={styles["instance-type"]}>
      {
        status === "done"
          ? <FaCheck className={`${styles.checkmark}`} size={18} />
          : <FaRefresh className={`${styles.checkmark}`} size={18} />
      }
      <p>
        <mark>{ nodetype }</mark>
      </p>
    </div>
    <div className={styles["running-time"]}>
      <p>{ status === "done" ? qosValue.toFixed(2) : "--" }</p>
    </div>

    <div className={styles["running-time"]}>
      <p>{ status === "done" ? cost.toFixed(2) : "--" }</p>
    </div>

    <div className={styles["running-time"]}>
      <p>{ status === "done" ? perfOverCost.toFixed(2) : "--" }</p>
    </div>

  </li>
);

export default ProgressItem;
