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

const SizingResultsPage = ({ logoMap, location, selectedApps }) => {
  let pathSplit = location.pathname.split("/");
  let id = pathSplit[pathSplit.length -1];
  let resultTable = "";
  let resultFigure = "";
  if (id !== "result") {
    resultTable = <ResultTable className={styles.ResultTable} id={id} />;
    resultFigure = <ResultFigure
      className={styles.ResultFigure}
      data={sampleSizingAnalysisData}
      id={id}
    />;
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
          <NavItemLink key={"sub_link_" + app.appId} id={"sub_link_" + app.appId} app={app}
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
          { resultTable }
        </div>
        <div>
          <p>Performance</p>
          { resultFigure }
        </div>
      </Container>
    </div>
)};

export default connect(mapStateToProps, mapDispatchToProps)(SizingResultsPage);
