import React from "react";
import Jumbotron from "commons/components/Jumbotron";
import Container from "commons/components/Container";
import Navbar from "commons/components/Navbar";
import NavItemLink from "commons/components/NavItemLink";
import ResultTable from "../ResultTable";
import TestStageIndicator from "../TestStageIndicator";
import KeySummary from "../KeySummary";
import styles from "./index.scss";
import mongoLogo from "assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "assets/images/asset_kafka_logo.svg";
import redisLogo from "assets/images/asset_redis_logo.svg";
import testStageIcon from "assets/images/icon_state_sizing_analysis.svg";
import testStageActiveIcon from "assets/images/icon_state_sizing_analysis_active.svg";
import resultStageIcon from "assets/images/icon_state_sizing_analysis_result.svg";
import resultStageActiveIcon from "assets/images/icon_state_sizing_analysis_result_done.svg";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import ProgressIndicator from "../ProgressIndicator";


const SizingResultsPage = ({ stage = STAGE_RESULT }) => (
  <div>
    <Jumbotron>
      <div className={styles["cluster-infos"]}>
      <ProgressIndicator stage={stage} />
      </div>
      <div className={styles["testing-summary"]}>
        <p>Testing summary</p>
        <main>
          <KeySummary title="App tested" value="2" />
          <KeySummary title="Running time" value="2:15" />
          <KeySummary title="Instances ran" value="36" />
        </main>
      </div>
    </Jumbotron>
    <Navbar>
      <NavItemLink
        to="/sizing-test/result/mongo"
        className={styles.NavItemLink}
        activeClassName={styles.selected}>
        <img src={mongoLogo} /> mongoDB
      </NavItemLink>
      <NavItemLink
        to="/sizing-test/result/redis"
        className={styles.NavItemLink}
        activeClassName={styles.selected}>
        <img src={redisLogo} /> Redis
      </NavItemLink>
      <NavItemLink
        to="/sizing-test/result/kafka"
        className={styles.NavItemLink}
        activeClassName={styles.selected}>
        <img src={kafkaLogo} /> Kafka
      </NavItemLink>
    </Navbar>
    <Container className={styles["results-content"]}>
      <div>
        <p>&nbsp;</p>
        <ResultTable className={styles.ResultTable} />
      </div>
      <div>
        <p>Performance</p>
        <div style={{ height: "400px", border: "1px solid black" }} />
      </div>
    </Container>
  </div>
);

export default SizingResultsPage;
