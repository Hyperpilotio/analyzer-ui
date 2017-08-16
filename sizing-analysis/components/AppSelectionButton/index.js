import React from "react";
import Button from "commons/components/Button";
import styles from "./index.scss";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelectionButton = ({ selected_apps, id, toggleSelected, app, iconUrl }) => {
  let selected = false;
  for(let selected_app of selected_apps){
     if(selected_app.appId === id){
       selected = true;
       break;
     }
  }
  let selectedClass = selected ? styles.selected : "";
  
  return (
    <Button className={`${styles.AppSelectionButton} ${selectedClass}`} 
        onClick={function(){toggleSelected(app)}}>
      <img src={iconUrl} />
      { app.appName }
    </Button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelectionButton);
