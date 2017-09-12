import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "~/commons/components/Button";
import { AnalyzerPropTypes } from "../../reducers/sizingReducer";
import AppSelectionButton from "../AppSelectionButton";
import styles from "./AppSelector.scss";
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelector = ({ addAll, apps, toggleSelected, onAnalyze }) => (
  <div className={styles.AppSelector}>
    <div className={styles["select-buttons"]}>
      <Button invert onClick={onAnalyze}> Analyze </Button>
      <Button onClick={addAll}> Select All </Button>
    </div>
    <div className={styles["apps-area"]}>
      {
        apps.map(app => (
          <AppSelectionButton
            key={app.name}
            selected={app.selected}
            app={app}
            onClick={() => toggleSelected(app.name)}
          />
        ))
      }
    </div>
  </div>
);

AppSelector.propTypes = {
  addAll: PropTypes.func.isRequired,
  toggleSelected: PropTypes.func.isRequired,
  onAnalyze: PropTypes.func.isRequired,
  apps: PropTypes.arrayOf(AnalyzerPropTypes.app).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelector);
