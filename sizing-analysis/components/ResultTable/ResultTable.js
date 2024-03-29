import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import FaChevronUp from "react-icons/lib/fa/chevron-up";
import { AnalyzerPropTypes } from "../../reducers/sizingReducer";
import styles from "./ResultTable.scss";


const objectiveBadgeMap = {
  MaxPerfOverCost: "Optimal Perf/Cost",
  MinCostWithPerfLimit: "Low Cost",
  MaxPerfWithCostLimit: "High Perf",
};


class ResultTable extends Component {
  state = { toggleOn: false }

  toggleFullList = () => {
    this.setState({ toggleOn: !this.state.toggleOn });
  }

  render() {
    const { className, data, highlightedInstance, onHighlight, onUnhighlight } = this.props;
    const sizingRuns = _.concat(..._.map(data.sizingRuns, "results")).map(
      ({ nodetype, ...stats }) => ({
        nodetype,
        ...stats,
        bestFor: _.get(_.find(data.recommendations, { nodetype }), "objective"),
      }),
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
            const classes = [
              styles["single-result"],
              styles["recommended-result"],
              styles[objective],
              highlightedInstance === nodetype ? styles.highlighted : "",
            ];
            return (
              <tr
                key={nodetype}
                className={classes.join(" ")}
                onMouseEnter={() => onHighlight(nodetype)}
                onMouseLeave={() => onUnhighlight()}
              >
                <td>
                  <i className={styles.point} />
                  { nodetype }
                  <span className={styles.badge}>{ objectiveBadgeMap[objective] }</span>
                </td>
                <td>{ Math.round(run.qosValue) }</td>
                <td>{ `$${run.cost.toFixed(2)}` }</td>
                <td>{ run.perfOverCost.toFixed(2) }</td>
              </tr>
            );
          }) }

          <tr className={styles["see-all"]}>
            <td colSpan={4}>
              <a role="presentation" onClick={this.toggleFullList}>
                {
                  this.state.toggleOn
                    ? [<FaChevronUp key={0} className={styles["down-icon"]} size={16} />, "Hide"]
                    : [<FaChevronDown key={0} className={styles["down-icon"]} size={16} />, "See all tested instances"]
                }
              </a>
            </td>
          </tr>

          { this.state.toggleOn && sizingRuns
            .map(({ nodetype, qosValue, cost, perfOverCost, bestFor }) => {
              const classes = [
                styles["single-result"],
                bestFor ? styles[bestFor] : null,
                highlightedInstance === nodetype ? styles.highlighted : null,
              ];
              return (
                <tr
                  key={nodetype}
                  className={classes.join(" ")}
                  onMouseEnter={() => onHighlight(nodetype)}
                  onMouseLeave={() => onUnhighlight()}
                >
                  <td>
                    <i className={styles.point} />
                    { nodetype }
                  </td>
                  {
                    qosValue === 0
                      ? <td colSpan={3}> Unavailable </td>
                      : [
                        <td key="perf">{ Math.round(qosValue) }</td>,
                        <td key="cost">{ `$${cost.toFixed(2)}` }</td>,
                        <td key="perfcost">{ perfOverCost.toFixed(2) }</td>,
                      ]
                  }
                </tr>
              );
            }) }
        </tbody>

      </table>
    );
  }
}

ResultTable.propTypes = {
  className: PropTypes.string,
  highlightedInstance: PropTypes.string,
  onHighlight: PropTypes.func,
  onUnhighlight: PropTypes.func,
  data: AnalyzerPropTypes.sizingRun.isRequired,
};

ResultTable.defaultProps = {
  className: "",
  highlightedInstance: null,
  onHighlight: () => {},
  onUnhighlight: () => {},
};

export default ResultTable;
