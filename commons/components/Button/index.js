import React from "react";
import styles from "./index.scss";

const Button = ({ invert = false, className = "", onClick = (e) => {console.log(e)}, children }) => {
  let invertClass = invert ? styles.invert : "";
  return (
    <a onClick={onClick} className={`${styles.Button} ${invertClass} ${className}`}>
      { children }
    </a>
  );
};

export default Button;
