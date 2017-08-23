import React from "react";
import Button from "commons/components/Button";
import styles from "./index.scss";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelectionButton = ({ selectedApps, id, toggleSelected, app, logoMap }) => {
  let selected = false;
  for(let selectedApp of selectedApps){
    if(selectedApp.appId === id){
      selected = true;
      break;
    }
  }
  let selectedClass = selected ? styles.selected : "";
  
  return (
    <Button
      className={`${styles.AppSelectionButton} ${selectedClass}`} 
      onClick={() => toggleSelected(app)}
    >
      <img src={logoMap[app.appName.toLowerCase()]} />
      { app.appName }
    </Button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelectionButton);
