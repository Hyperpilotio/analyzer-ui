import React from "react";
import PropTypes from "prop-types";
import testStageIcon from "~/assets/images/icon_state_sizing_analysis.svg";
import testStageActiveIcon from "~/assets/images/icon_state_sizing_analysis_active.svg";
import resultStageIcon from "~/assets/images/icon_state_sizing_analysis_result.svg";
import resultStageActiveIcon from "~/assets/images/icon_state_sizing_analysis_result_done.svg";
import TestStageIndicator from "../TestStageIndicator";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./ProgressIndicator.scss";


const ProgressIndicator = ({ stage, className }) => (
  <div className={`${styles.ProgressIndicator} ${className}`}>
    <TestStageIndicator
      active={stage > STAGE_CONFIG}
      title="Sizing Analysis"
      description="app instances"
      icon={testStageIcon}
      activeIcon={testStageActiveIcon}
    />

    <TestStageIndicator
      active={stage > STAGE_TEST}
      title="Recommend"
      description="best instances"
      icon={resultStageIcon}
      activeIcon={resultStageActiveIcon}
    />
  </div>
);

ProgressIndicator.propTypes = {
  stage: PropTypes.oneOf([STAGE_CONFIG, STAGE_TEST, STAGE_RESULT]).isRequired,
  className: PropTypes.string,
};

ProgressIndicator.defaultProps = {
  className: "",
};

export default ProgressIndicator;
