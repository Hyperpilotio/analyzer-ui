import React from "react";
import Button from "~/commons/components/Button";
import styles from "./AppSelectionButton.scss";


const AppSelectionButton = ({ selected, app, onClick }) => {
  let selectedClass = selected ? styles.selected : "";
  
  return (
    <Button className={ `${styles.AppSelectionButton} ${selectedClass}` } onClick={ onClick }>
      <img src={ app.logo } />
      { app.displayName }
    </Button>
  );
}

export default AppSelectionButton;
