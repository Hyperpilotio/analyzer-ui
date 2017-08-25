import React, { Component } from "react";
import _ from "lodash";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import FaChevronUp from "react-icons/lib/fa/chevron-up";
import styles from "./ResultTable.scss";


const objectiveBadgeMap = {
  MaxPerfOverCost: "Optimal Perf/Cost",
  MinCostWithPerfLimit: "Low Cost",
  MaxPerfWithCostLimit: "High Perf"
};


class ResultTable extends Component {

  state = { toggleOn: false }

  toggleFullList() {
    this.setState({ toggleOn: !this.state.toggleOn });
  }

  render() {
    const { className, data } = this.props;
    const sizingRuns = _.concat(..._.map(data.sizingRuns, "results")).map(
      ({ nodetype, ...stats }) => ({
        nodetype,
        ...stats,
        bestFor: _.get(_.find(data.recommendations, { nodetype }), "objective", null)
      })
    );

    return (
      <table className={`${styles.ResultTable} ${className}`}>
        <thead>
          <tr>
            <th>Instance Type</th>
            <th>Perf</th>
            <th>Cost</th>
            <th>Perf / Cost</th>
          </tr>
        </thead>

        <tbody>
          { data.recommendations.map(({ objective, nodetype }) => {
            const run = _.find(sizingRuns, { nodetype });
            return <tr className={`${styles["single-result"]} ${styles[objective]}`}>
              <td>
                <i className={styles.point} />
                { nodetype }
                <span className={styles.badge}>{ objectiveBadgeMap[objective] }</span>
              </td>
              <td>{ Math.round(run.qosValue) }</td>
              <td>{ `$${run.cost.toFixed(2)}` }</td>
              <td>{ run.perfOverCost.toFixed(2) }</td>
            </tr>;
          }) }

          <tr className={styles["see-all"]}>
            <td colSpan={4}>
              <a onClick={::this.toggleFullList}>
                { this.state.toggleOn ? [
                    <FaChevronUp className={styles["down-icon"]} size={16} />,
                    "Hide"
                  ] : [
                    <FaChevronDown className={styles["down-icon"]} size={16} />,
                    "See all tested instances"
                  ] }
              </a>
            </td>
          </tr>

          { this.state.toggleOn && sizingRuns
            .map(({ nodetype, qosValue, cost, perfOverCost, bestFor }) => (
              <tr key={nodetype} className={`${styles["single-result"]} ${styles[bestFor] || ""}`}>
                <td>
                  <i className={styles.point} />
                  { nodetype }
                </td>
                { qosValue === 0 ? (
                    <td colSpan={3}> Unavailable </td>
                  ) : [
                    <td>{ Math.round(qosValue) }</td>,
                    <td>{ `$${cost.toFixed(2)}` }</td>,
                    <td>{ perfOverCost.toFixed(2) }</td>
                  ] }
              </tr>
            )) }
        </tbody>

      </table>
    );

  }
}

export default ResultTable;
