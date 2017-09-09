import React from "react";
import fetch from "isomorphic-fetch";
import { connect as connectRefetch } from "react-refetch";
import Jumbotron from "commons/components/Jumbotron";
import AppSelector from "../AppSelector";
import RunnerModal from "../RunnerModal";
import Container from "commons/components/Container";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";
import styles from "./SizingRunnerPage.scss";
import ProgressIndicator from "../ProgressIndicator"

const SizingRunnerPage = ({ stage = STAGE_CONFIG, analysisFetch, history }) => {
  let modalElement = (stage !== STAGE_TEST || analysisFetch.pending) ? "" : (
    <div className={styles["modal-container"]}>
      <RunnerModal data={analysisFetch.value} />
    </div>
  );

  return <div className={styles.SizingRunnerPage}>
    <Jumbotron>
      <ProgressIndicator stage={stage} />
    </Jumbotron>
    <main>
      <Container className={styles.Container}>
        {/*<div>
          <h3>Apps</h3>
          <div className={styles["cluster-info"]}>
            <p>Current cluster manager</p>
            <h3>Kubernetes</h3>
          </div>
          <div className={styles["cluster-info"]}>
            <p>TBD</p>
            <h3>TBD info</h3>
          </div>
          <div className={styles["cluster-info"]}>
            <p>TBD Info</p>
            <h3>TBD</h3>
          </div>
        </div>*/}
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <AppSelector onAnalyze={async e => {
            e.preventDefault();
            const res = await fetch("/api/apps/mysql/analysis/run", { method: "POST" });
            const data = await res.json();
            if (data.error === false) {
              history.push("/sizing-test/run-test");
            } else {
              console.error(data);
            }
          }} />
        </div>
      </Container>
      { modalElement }
    </main>
  </div>
};

export default connectRefetch(({ stage }) => (
  stage === STAGE_TEST
    ? { analysisFetch: {url: "/api/apps/mysql/analysis", refreshInterval: 5 * 1000} }
    : {}
))(SizingRunnerPage);
