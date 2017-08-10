import React from "react";
import Jumbotron from "commons/components/Jumbotron";
import Container from "commons/components/Container";
import Navbar from "commons/components/Navbar";
import NavItemLink from "commons/components/NavItemLink";
import ResultTable from "../ResultTable";
import KeySummary from "../KeySummary";
import styles from "./index.scss";
import mongoLogo from "assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "assets/images/asset_kafka_logo.svg";
import redisLogo from "assets/images/asset_redis_logo.svg";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme } from 'victory';


const SizingResultsPage = () => (
  <div>
    <Jumbotron>
      <div className={styles["cluster-infos"]}>
        <div>
          <p>Cluster manager</p>
          <h3>Kubernetes</h3>
        </div>
        <div>
          <p>Last update</p>
          <h3>25/07/14</h3>
        </div>
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
        <div style={{ height: "400px", border: "1px solid black" }} >
                  <VictoryChart 
           domain={{ x: [0, 5], y: [0, 7] }}>
           <VictoryScatter
             size={5}
    data={[
      { x: 1, y: 4, label: "c4.large", border: "0px",  fill: "#5677fa",  stroke: "#5677fa", strokeWidth: 2 },
      { x: 2, y: 2, label: "c3.X-large",  fill: "#eef0fa", stroke: "#5677fa", strokeWidth: 2 },
      { x: 3, y: 3, label: "Low cost", fill: "#daf9b8", stroke: "#b8e986", strokeWidth: 2 },
    ]}
  />
</VictoryChart>

        </div>
      </div>
    </Container>
  </div>
);

export default SizingResultsPage;
