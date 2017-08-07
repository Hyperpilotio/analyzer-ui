import React from "react";
import styles from "./ProgressBar.scss";

const ProgressBar = ({ className = "", containerClass = "", percent = 100 }) => (
  <div className={`${styles.ProgressBar} ${containerClass}`}>
    <div
      style={{ width: `${percent}%` }}
      className={`${styles["filling-area"]} ${className}`} />
  </div>
);

export default ProgressBar;
