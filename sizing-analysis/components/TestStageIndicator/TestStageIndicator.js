import React from "react";
import PropTypes from "prop-types";
import styles from "./TestStageIndicator.scss";

const TestStageIndicator = ({ title, description, icon, activeIcon, active }) => {
  const activeClass = active ? styles.active : "";
  const iconUrl = active ? activeIcon : icon;
  return (
    <div className={styles.TestStageIndicator}>
      <img
        className={`${styles.element} ${styles.icon} ${activeClass}`}
        src={iconUrl}
        alt={title}
      />
      <div className={`${styles.element} ${styles.content} ${activeClass}`}>
        <h4> { title } </h4>
        <p> { description } </p>
      </div>
    </div>
  );
};

TestStageIndicator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  activeIcon: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

TestStageIndicator.defaultProps = {
  active: false,
};

export default TestStageIndicator;
