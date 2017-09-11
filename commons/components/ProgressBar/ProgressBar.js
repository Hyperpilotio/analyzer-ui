import React from "react";
import PropTypes from "prop-types";
import styles from "./ProgressBar.scss";

const ProgressBar = ({ className, containerClass, percent }) => (
  <div className={`${styles.ProgressBar} ${containerClass}`}>
    <div
      style={{ width: `${percent}%` }}
      className={`${styles["filling-area"]} ${className}`}
    />
  </div>
);

ProgressBar.propTypes = {
  className: PropTypes.string,
  containerClass: PropTypes.string,
  percent: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  className: "",
  containerClass: "",
};

export default ProgressBar;
