import React from "react";
import PropTypes from "prop-types";
import FaLoadingCircle from "react-icons/lib/fa/circle-o-notch";
import styles from "./Button.scss";

const Button = ({ invert, className, onClick, children, isLoading, isDisabled }) => {
  const invertClass = invert ? styles.invert : "";
  return (
    <button
      className={`${styles.Button} ${invertClass} ${className}`}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      { isLoading ? <FaLoadingCircle className={`mr-1 mb-1 ${styles.rotating}`} /> : null}
      { children }
    </button>
  );
};

Button.propTypes = {
  invert: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  invert: false,
  className: "",
  onClick: () => {},
  children: null,
  isLoading: false,
  isDisabled: false,
};

export default Button;
