import React from "react";
import styles from "./ResultTable.scss";

const ResultTable = ({ className = "" }) => (
  <div className={`${styles.ResultTable} ${className}`}>
    <div className={styles["bench-grid"]}>
      <table>
        <tr className={styles["grid-tr"]}>
          <th className={styles["grid-th"]}></th>
          <th className={styles["grid-th"]}>Instance Type</th>
          <th className={styles["grid-th"]}>Perf</th>
          <th className={styles["grid-th"]}>Cost</th>
        </tr>
        <tr className={styles["grid-tr"]}>
          <td className={styles["grid-td"]}><div className={styles["oval-2"]}></div>Optimal Perf/Cost</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>c4.large</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>600</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>$230.78</td>
        </tr>
        <tr className={styles["grid-tr"]}>
          <td className={styles["grid-td"] }><div className={styles["oval-3"]}></div>High performance</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>c3.X-large</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>680</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>$250.43</td>
        </tr>
        <tr className={styles["grid-tr"]}>
          <td className={styles["grid-td"] + " " + styles["left"]}><div className={styles["oval-4"]}></div>Low cost</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>m2.medium</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>270</td>
          <td className={styles["grid-td"] + " " + styles["center"]}>$60.25</td>
        </tr>

      </table>
    </div>
    <div >
      <div>
        <h3></h3>
      </div>
    </div>
  </div>
);

export default ResultTable;
