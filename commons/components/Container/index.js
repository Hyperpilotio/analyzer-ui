import React from "react";
import styles from "./index.scss";


const Container = ({ className = "", children }) => (
  <div className={`${styles.Container} ${className}`}>
    { children }
  </div>
);

export default Container;
