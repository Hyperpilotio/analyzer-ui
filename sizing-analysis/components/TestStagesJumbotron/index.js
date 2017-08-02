import React from "react";
import Container from "commons/components/Container";
import TestStageIndicator from "../TestStageIndicator";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./index.scss";
import hyperpilotNavLogo from "assets/images/asset_hyperpilot_nav_logo.svg";

const TestStagesJumbotron = ({ stage = STAGE_CONFIG }) => (
  <div className={styles.TestStagesJumbotron}>
    <Container className={styles.Container}>
      <div className={styles.intro}>
        <h3>Initial Benchmark Test</h3>
        <p>Connect existing apps from cluster managers to run analyzer</p>
      </div>
      <div className={styles.stages}>
        <TestStageIndicator
          active={stage > STAGE_CONFIG}
          title="Benchmark Test"
          description="all your instances"
          icon={hyperpilotNavLogo} />
        <span className={styles["arrow-icon"]} />
        <TestStageIndicator
          active={stage > STAGE_TEST}
          title="Recommend"
          description="instances for apps"
          icon={hyperpilotNavLogo} />
      </div>
    </Container>
  </div>
);

export default TestStagesJumbotron;
