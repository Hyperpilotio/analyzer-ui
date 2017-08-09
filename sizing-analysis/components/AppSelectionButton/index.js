import React from "react";
import Button from "commons/components/Button";
import styles from "./index.scss";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelectionButton = (props) => {
  let selected_apps = props.reducer[0].selected_apps;
  let selected = false;
  for(let selected_app of selected_apps){
     if(selected_app.appId === props.id){
       selected = true;
       break;
     }
  }
  let selectedClass = selected ? styles.selected : "";
  
  return (
    <Button className={`${styles.AppSelectionButton} ${selectedClass}`} 
        onClick={function(){props.toggleSelected(props.app)}}>
      <img src={props.iconUrl} />
      { props.app.appName }
    </Button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelectionButton);
