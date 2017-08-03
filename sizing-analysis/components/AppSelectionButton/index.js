import React from "react";
import Button from "commons/components/Button";
import styles from "./index.scss";

const AppSelectionButton = ({ app, iconUrl, selected = false }) => {
  let selectedClass = selected ? styles.selected : "";
  return (
    <Button className={`${styles.AppSelectionButton} ${selectedClass}`}>
      <img src={iconUrl} />
      { app }
    </Button>
  );
};

export default AppSelectionButton;
