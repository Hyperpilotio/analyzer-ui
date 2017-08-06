import React from "react";
import styles from "./index.scss";

const KeySummary = ({ title, value }) => (
  <div className={styles.KeySummary}>
    <span className={styles.value}>{value}</span>
    <span className={styles.title}>{title}</span>
  </div>
);

export default KeySummary;
