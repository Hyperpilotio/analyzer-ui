import React from "react";
import Button from "commons/components/Button";
import AppSelectionButton from "../AppSelectionButton";
import styles from "./index.scss";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelector = ({ addAll, apps, toggleSelected, onAnalyze }) =>  (
  <div className={styles.AppSelector}>
    <div className={styles["select-buttons"]}>
      <Button invert onClick={ onAnalyze }> Analyze </Button>
      <Button onClick={ addAll }> Select All </Button>
    </div>
    <div className={styles["apps-area"]}>
      { apps.map(app => (
        <AppSelectionButton
          key={ app.name }
          selected={ app.selected }
          app={ app }
          onClick={ () => toggleSelected(app.name) }
        />
      )) }
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(AppSelector);
