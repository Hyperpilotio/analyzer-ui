import React from "react";
import styles from "./Button.scss";

const Button = ({ invert = false, className = "", onClick = () => {}, children }) => {
  let invertClass = invert ? styles.invert : "";
  return (
    <a onClick={onClick} className={`${styles.Button} ${invertClass} ${className}`}>
      { children }
    </a>
  );
};

export default Button;
