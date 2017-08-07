import React from "react";
import Jumbotron from "commons/components/Jumbotron";
import Navbar from "commons/components/Navbar";
import NavItemLink from "commons/components/NavItemLink";
import ResultTable from "../ResultTable";
import KeySummary from "../KeySummary";
import styles from "./index.scss";
import mongoLogo from "assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "assets/images/asset_kafka_logo.svg";
import redisLogo from "assets/images/asset_redis_logo.svg";

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
    <ResultTable>
      <div className={styles["bench-grid"]}>
        <table>
          <tr className={styles["grid-tr"]}>
            <th className={styles["grid-th"]}></th>
            <th className={styles["grid-th"]}>Instance Type</th>
            <th className={styles["grid-th"]}>Perf</th>
            <th className={styles["grid-th"]}>Cost</th>
          </tr>
          <tr className={styles["grid-tr"]}>
            <td className={styles["grid-td"]}><div className={styles["oval-2"]}></div>Optimal Perf/Cost</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>c4.large</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>600</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>$230.78</td>
          </tr>        
          <tr className={styles["grid-tr"]}>
            <td className={styles["grid-td"] }><div className={styles["oval-3"]}></div>High performance</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>c3.X-large</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>680</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>$250.43</td>
          </tr>        
          <tr className={styles["grid-tr"]}>
            <td className={styles["grid-td"] + " " + styles["left"]}><div className={styles["oval-4"]}></div>Low cost</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>m2.medium</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>270</td>
            <td className={styles["grid-td"] + " " + styles["center"]}>$60.25</td>
          </tr>                

        </table>
      </div>
      <div >
        <div>
          <h3></h3>
        </div>
      </div>    
    </ResultTable>
  </div>
);

export default SizingResultsPage;
