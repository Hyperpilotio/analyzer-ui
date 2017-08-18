import React from "react";
import Jumbotron from "commons/components/Jumbotron";
import Container from "commons/components/Container";
import Navbar from "commons/components/Navbar";
import NavItemLink from "commons/components/NavItemLink";
import ResultTable from "../ResultTable";
import ResultFigure from "../ResultFigure";
import KeySummary from "../KeySummary";
import ProgressIndicator from "../ProgressIndicator";
import {
  STAGE_CONFIG,
  STAGE_TEST,
  STAGE_RESULT,
  sampleSizingAnalysisData
} from "../../constants";
import styles from "./index.scss";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";

const SizingResultsPage = ({ logoMap, history, match, selectedApps }) => {
  const { appId } = match.params;

  if (!appId) {
    if (selectedApps.length) {
      history.replace(`/sizing-test/result/${selectedApps[0].appId}`);
    }
    return <div />;
  }
  return (
    <div>
      <Jumbotron>
        <ProgressIndicator
           className={styles.ProgressIndicator}
           stage={STAGE_RESULT} />
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
        {selectedApps.map(app => (
          <NavItemLink key={app.appId}
            className={styles.NavItemLink}
            activeClassName={styles.selected}
            to={"/sizing-test/result/" + app.appId} >
            <img src={logoMap[app.appName.toLowerCase()]} /> {app.appName}
          </NavItemLink>
        ))}
      </Navbar>
      <Container className={styles["results-content"]}>
        <div>
          <p>&nbsp;</p>
          <ResultTable className={styles.ResultTable} id={appId} />
        </div>
        <div>
          <p>Performance</p>
          <ResultFigure
            className={styles.ResultFigure}
            data={sampleSizingAnalysisData}
            id={appId}
          />
        </div>
      </Container>
    </div>
)};

export default connect(mapStateToProps, mapDispatchToProps)(SizingResultsPage);
