import React from "react";
import styles from "./index.scss";

const TestStageIndicator = ({
  title,
  description,
  icon,
  activeIcon,
  active = false
}) => {
  let activeClass = active ? styles.active : "";
  let iconUrl = active ? activeIcon : icon;
  return <div className={styles.TestStageIndicator}>
    <img
      className={`${styles.element} ${styles.icon} ${activeClass}`}
      src={iconUrl} />
    <div className={`${styles.element} ${styles.content} ${activeClass}`}>
      <h4> { title } </h4>
      <p> { description } </p>
    </div>
  </div>
}

export default TestStageIndicator;
