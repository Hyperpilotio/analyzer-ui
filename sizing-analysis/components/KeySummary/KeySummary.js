import React from "react";
import PropTypes from "prop-types";
import styles from "./KeySummary.scss";

const KeySummary = ({ title, value }) => (
  <div className={styles.KeySummary}>
    <span className={styles.value}>{value}</span>
    <span className={styles.title}>{title}</span>
  </div>
);

KeySummary.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default KeySummary;
