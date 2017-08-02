import React from "react";
import styles from "./index.scss";

const BenchmarkStageIndicator = ({ title, description, icon, active = false }) => {
  let activeClass = active ? styles.active : "";
  return <div className={styles.BenchmarkStageIndicator}>
    <img className={`${styles.element} ${styles.icon} ${activeClass}`} src={icon} />
    <div className={`${styles.element} ${styles.content} ${activeClass}`}>
      <h4> { title } </h4>
      <p> { description } </p>
    </div>
  </div>
}

export default BenchmarkStageIndicator;
