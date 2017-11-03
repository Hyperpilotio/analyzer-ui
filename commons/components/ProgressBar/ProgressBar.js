import React from "react";
import PropTypes from "prop-types";
import styles from "./ProgressBar.scss";

const ProgressBar = ({ text, className, containerClass, percent }) => (
  <div className={`${styles.ProgressBar} ${containerClass}`}>
    <div
      style={{ width: `${percent}%` }}
      className={`${styles["filling-area"]} ${className}`}
    >
      <span>{text}</span>
    </div>
  </div>
);

ProgressBar.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  percent: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  text: "",
  className: "",
  containerClass: "",
};

export default ProgressBar;
