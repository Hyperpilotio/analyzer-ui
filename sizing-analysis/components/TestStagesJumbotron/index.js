import React from "react";
import Jumbotron from "commons/components/Jumbotron";
import TestStageIndicator from "../TestStageIndicator";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./index.scss";
import testStageIcon from "assets/images/icon_state_sizing_analysis.svg";
import testStageActiveIcon from "assets/images/icon_state_sizing_analysis_active.svg";
import resultStageIcon from "assets/images/icon_state_sizing_analysis_result.svg";
import resultStageActiveIcon from "assets/images/icon_state_sizing_analysis_result_done.svg";
import KeySummary from "../KeySummary";
import ProgressIndicator from "../ProgressIndicator"


const TestStagesJumbotron = ({ stage = STAGE_CONFIG }) => (

  <Jumbotron
    className={styles["cluster-infos"]}
    containerClassName={styles.Container}>

    <ProgressIndicator/>
  </Jumbotron>
);


export default TestStagesJumbotron;
