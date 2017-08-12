import React from "react";
import Jumbotron from "commons/components/Jumbotron";
import Navbar from "commons/components/Navbar";
import NavItemLink from "commons/components/NavItemLink";
import TestStageIndicator from "../TestStageIndicator";
import KeySummary from "../KeySummary";
import styles from "./ProgressIndicator.scss";
import mongoLogo from "assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "assets/images/asset_kafka_logo.svg";
import redisLogo from "assets/images/asset_redis_logo.svg";
import testStageIcon from "assets/images/icon_state_sizing_analysis.svg";
import testStageActiveIcon from "assets/images/icon_state_sizing_analysis_active.svg";
import resultStageIcon from "assets/images/icon_state_sizing_analysis_result.svg";
import resultStageActiveIcon from "assets/images/icon_state_sizing_analysis_result_done.svg";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";


const ProgressIndicator = ({ stage = STAGE_CONFIG }) => (
  <div className={styles.ProgressIndicator}>
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



    );

export default ProgressIndicator;
