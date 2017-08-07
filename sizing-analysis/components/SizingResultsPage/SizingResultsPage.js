import React from "react";
import Jumbotron from "commons/components/Jumbotron";
import KeySummary from "../KeySummary";
import styles from "./index.scss";

const SizingResultsPage = () => (
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
);

export default SizingResultsPage;
