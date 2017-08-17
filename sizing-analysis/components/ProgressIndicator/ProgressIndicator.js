import React from "react";
<<<<<<< HEAD
import Jumbotron from "commons/components/Jumbotron";
import Navbar from "commons/components/Navbar";
import NavItemLink from "commons/components/NavItemLink";
import TestStageIndicator from "../TestStageIndicator";
import KeySummary from "../KeySummary";
import styles from "./ProgressIndicator.scss";
import mongoLogo from "assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "assets/images/asset_kafka_logo.svg";
import redisLogo from "assets/images/asset_redis_logo.svg";
=======
import TestStageIndicator from "../TestStageIndicator";
>>>>>>> 6ea26994fb6b0bc7741148b7d1ce8c4089163002
import testStageIcon from "assets/images/icon_state_sizing_analysis.svg";
import testStageActiveIcon from "assets/images/icon_state_sizing_analysis_active.svg";
import resultStageIcon from "assets/images/icon_state_sizing_analysis_result.svg";
import resultStageActiveIcon from "assets/images/icon_state_sizing_analysis_result_done.svg";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
<<<<<<< HEAD


const ProgressIndicator = ({ stage = STAGE_CONFIG }) => (
  <div className={styles.ProgrssIndicator}>
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
=======
import styles from "./ProgressIndicator.scss";


const ProgressIndicator = ({ stage = STAGE_CONFIG, className = "" }) => (
  <div className={`${styles.ProgressIndicator} ${className}`}>
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
>>>>>>> 6ea26994fb6b0bc7741148b7d1ce8c4089163002

export default ProgressIndicator;
