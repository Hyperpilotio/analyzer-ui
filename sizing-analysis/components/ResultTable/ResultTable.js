import React from "react";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import styles from "./ResultTable.scss";

const ResultTable = ({ className = "" }) => (
  <table className={`${styles.ResultTable} ${className}`}>
    <thead>
      <tr>
        <th></th>
        <th>Instance Type</th>
        <th>Perf</th>
        <th>Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr className={styles["single-result"]}>
        <td>
          <i className={styles["optimal-perf-cost"]} />
          Optimal Perf/Cost
        </td>
        <td>c4.large</td>
        <td>600</td>
        <td>$230.78</td>
      </tr>
      <tr className={styles["single-result"]}>
        <td>
          <i className={styles["optimal-perf"]} />
          High performance
        </td>
        <td>c3.X-large</td>
        <td>680</td>
        <td>$250.43</td>
      </tr>
      <tr className={styles["single-result"]}>
        <td>
          <i className={styles["optimal-cost"]} />
          Low cost
        </td>
        <td>m2.medium</td>
        <td>270</td>
        <td>$60.25</td>
      </tr>
      <tr className={styles["see-all"]}>
        <td colSpan="4">
          See all tested instances
          <FaChevronDown className={styles["down-icon"]}size={16} />
        </td>
      </tr>
    </tbody>
  </table>
);

export default ResultTable;
