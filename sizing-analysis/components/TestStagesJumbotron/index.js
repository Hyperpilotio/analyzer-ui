import React from "react";
import Container from "commons/components/Container";
import TestStageIndicator from "../TestStageIndicator";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./index.scss";
import testStageIcon from "assets/images/icon_state_sizing_analysis.svg";
import testStageActiveIcon from "assets/images/icon_state_sizing_analysis_active.svg";
import resultStageIcon from "assets/images/icon_state_sizing_analysis_result.svg";
import resultStageActiveIcon from "assets/images/icon_state_sizing_analysis_result_done.svg";

const TestStagesJumbotron = ({ stage = STAGE_CONFIG }) => (
  <div className={styles.TestStagesJumbotron}>
    <Container className={styles.Container}>
      <div className={styles.intro}>
        <h3>Initial Sizing Test</h3>
        <p>Connect existing apps from cluster managers to run analyzer</p>
      </div>
      <div className={styles.stages}>
        <TestStageIndicator
          active={stage > STAGE_CONFIG}
          title="Sizing Analysis"
          description="all your instances"
          icon={testStageIcon}
          activeIcon={testStageActiveIcon} />

        <TestStageIndicator
          active={stage > STAGE_TEST}
          title="Recommend"
          description="instances for apps"
          icon={resultStageIcon}
          activeIcon={resultStageActiveIcon} />
      </div>
    </Container>
  </div>
);

export default TestStagesJumbotron;
