import React from "react";
import styles from "./index.scss";

const BenchmarkStageIndicator = ({ title, description, icon, active }) => (
  <div className={styles.BenchmarkStageIndicator}>
    <img className={`${styles.element} ${styles.icon}`} src={icon} />
    <div className={`${styles.element} ${styles.content}`}>
      <h4> { title } </h4>
      <p> { description } </p>
    </div>
  </div>
)

export default BenchmarkStageIndicator;
