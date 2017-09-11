import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect as connectRefetch, PromiseState } from "react-refetch";
import Jumbotron from "~/commons/components/Jumbotron";
import Container from "~/commons/components/Container";
import AppSelector from "../AppSelector";
import RunnerModal from "../RunnerModal";
import ProgressIndicator from "../ProgressIndicator";
import { STAGE_CONFIG, STAGE_TEST } from "../../constants";
import styles from "./SizingRunnerPage.scss";

const SizingRunnerPage = ({ stage, analysisFetch, history }) => {
  const modalElement = (stage !== STAGE_TEST || analysisFetch.pending) ? "" : (
    <div className={styles["modal-container"]}>
      <RunnerModal data={analysisFetch.value} />
    </div>
  );

  const onAnalyze = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/apps/mysql/analysis/run", { method: "POST" });
    const data = await res.json();
    if (data.error === false) {
      history.push("/sizing-test/run-test");
    } else {
      console.error(data);
    }
  };

  return (
    <div className={styles.SizingRunnerPage}>
      <Jumbotron>
        <ProgressIndicator stage={stage} />
      </Jumbotron>
      <main>
        <Container className={styles.Container}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <AppSelector onAnalyze={onAnalyze} />
          </div>
        </Container>
        { modalElement }
      </main>
    </div>
  );
};

SizingRunnerPage.propTypes = {
  stage: PropTypes.oneOf([STAGE_CONFIG, STAGE_TEST]).isRequired,
  analysisFetch: PropTypes.instanceOf(PromiseState).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default connectRefetch(({ stage }) => (
  stage === STAGE_TEST
    ? { analysisFetch: { url: "/api/apps/mysql/analysis", refreshInterval: 5 * 1000 } }
    : {}
))(SizingRunnerPage);
