import React from "react";
import PropTypes from "prop-types";
import Button from "~/commons/components/Button";
import { AnalyzerPropTypes } from "../../reducers/sizingReducer";
import styles from "./AppSelectionButton.scss";


const AppSelectionButton = ({ selected, app, onClick }) => {
  const selectedClass = selected ? styles.selected : "";

  return (
    <Button className={`${styles.AppSelectionButton} ${selectedClass}`} onClick={onClick}>
      <img src={app.logo} alt={app.displayName} />
      { app.displayName }
    </Button>
  );
};

AppSelectionButton.propTypes = {
  app: AnalyzerPropTypes.app.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

AppSelectionButton.defaultProps = {
  selected: false,
  onClick: () => {},
};

export default AppSelectionButton;
