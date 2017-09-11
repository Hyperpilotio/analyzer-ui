import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.scss";

const Button = ({ invert, className, onClick, children }) => {
  const invertClass = invert ? styles.invert : "";
  return (
    <a
      className={`${styles.Button} ${invertClass} ${className}`}
      role="presentation"
      onClick={onClick}
    >
      { children }
    </a>
  );
};

Button.propTypes = {
  invert: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  invert: false,
  className: "",
  onClick: () => {},
  children: null,
};

export default Button;
