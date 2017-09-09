import React from "react";
import styles from "./Container.scss";


const Container = ({ className = "", flex = false, children }) => (
  <div className={`${styles.Container} ${flex ? styles.flex : ""} ${className}`}>
    { children }
  </div>
);

export default Container;
