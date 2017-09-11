import React from "react";
import PropTypes from "prop-types";
import styles from "./Container.scss";


const Container = ({ className, flex, children }) => (
  <div className={`${styles.Container} ${flex ? styles.flex : ""} ${className}`}>
    { children }
  </div>
);

Container.propTypes = {
  className: PropTypes.string,
  flex: PropTypes.bool,
  children: PropTypes.node,
};

Container.defaultProps = {
  className: "",
  flex: false,
  children: null,
};

export default Container;
