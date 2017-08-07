import React from "react";
import Container from "../Container";
import styles from "./index.scss";

const Navbar = ({ className = "", children }) => (
  <nav className={`${styles.Navbar} ${className}`}>
    <Container className={styles.Container}>
      { children }
    </Container>
  </nav>
);

export default Navbar;
