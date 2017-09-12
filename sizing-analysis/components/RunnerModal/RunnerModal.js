import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProgressBar from "~/commons/components/ProgressBar";
import mysqlLogo from "~/assets/images/asset_mysql_logo.svg";
import ProgressItem from "../ProgressItem";
import { AnalyzerPropTypes } from "../../reducers/sizingReducer";
import styles from "./RunnerModal.scss";


const calculatePercentage = (data) => {
  if (data.status !== "complete" && data.sizingRuns.length === 0) {
    return 0;
  }
  if (data.status === "complete") {
    return 100;
  }
  const lastEntry = data.sizingRuns[data.sizingRuns.length - 1];
  const generalProgress = Math.min(data.sizingRuns.length / 6, 0.9);
  if (!!lastEntry && lastEntry.results[0].status === "running") {
    return (generalProgress - ((1 / 6) * 0.5)) * 100;
  }
  return generalProgress * 100;
};

const RunnerModal = ({ data, className }) => (
  <div className={`${styles.RunnerModal} ${className}`}>

    <div className={styles.RunnerHeader}>
      <img className={styles["RunnerHeader-logo"]} src={mysqlLogo} alt="MySQL" />
      MySQL running
    </div>

    {/* progress bar */}
    <div className={styles.progressbar}>
      <ProgressBar percent={calculatePercentage(data)} />
    </div>


    {/* instance info */}
    <div className={styles["instance-progress-type"]}>
      <div className={styles["instance-progress-type-status"]}>Status</div>
      <div className={styles["instance-progress-type-perf"]}>Perf</div>
      <div className={styles["instance-progress-type-cost"]}>Cost</div>
      <div className={styles["instance-progress-type-perfcost"]}>Perf/Cost</div>
    </div>

    {/* instance run */}
    <div className={styles["completion-status-group-canvas"]}>
      <ul className={styles["completion-status-group"]}>
        {
          data.sizingRuns.map(({ results }) => (
            results.map(result => <ProgressItem {...result} />)
          ))
        }
      </ul>
    </div>


    <div className={styles["button-to-result"]}>
      <Link to="/sizing-test/result" className={`${styles.Button} ${data.status === "complete" ? "" : styles.disabled}`}>
        See Results
      </Link>
    </div>
  </div>
);

RunnerModal.propTypes = {
  data: AnalyzerPropTypes.sizingRun,
  className: PropTypes.string,
};

RunnerModal.defaultProps = {
  data: { status: "complete", sizingRuns: [] },
  className: "",
};

export default RunnerModal;
