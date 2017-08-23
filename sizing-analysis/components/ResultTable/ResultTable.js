import React, {Component} from "react";
import _ from "lodash";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import FaChevronUp from "react-icons/lib/fa/chevron-up";
import styles from "./ResultTable.scss";
import { connect } from 'react-redux';
import { mapStateToProps } from "../../actions";

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherTests: [], 
      toggleOn: false, 
      selectedApp: this.getSelectedApp(props)
    }
    this.toggleOtherTests = this.toggleOtherTests.bind(this);
  }
  getSelectedApp(props) {
    for (let app of props.selectedApps) {
      if (props.id === app.appName) {
        return app;
      }
    }
  }

  toggleOtherTests() {
    let otherTests = [];
    let toggleOn = !this.state.toggleOn;
    if (toggleOn) {
      if (!!this.props.data.sizingRuns) {
        for (let sizingRun of this.props.data.sizingRuns) {
          let run = sizingRun.run;
          let testNum = 0;
          for (let test of sizingRun.results) {
            test.testRound = run + "." + (++testNum);
            otherTests.push(test);
          }
        }
      }
    }
    this.setState({
      otherTests: otherTests,
      toggleOn: toggleOn
    });
  }

  componentWillReceiveProps(nextProps){
    //set back to originally setting when switch to another app
    if (this.props.id !== nextProps.id) {
      this.setState({
        otherTests: [],
        toggleOn: false,
        selectedApp: this.getSelectedApp(nextProps)
      });
    }
  }


  render() {
    let className = this.props.className;
    let selectedApp = this.props.data;
    let sizingRuns = _.concat(..._.map(selectedApp.sizingRuns, "results"));
    let returnTable;
    let optimal;
    let highPerf;
    let lowCost;
    let clickToggleTxt = "See all tested instances";
    let clickToggle = <FaChevronDown className={styles["down-icon"]} size={16} />;

    if (this.state.toggleOn) {
      clickToggleTxt = "Hide other tested instances"; 
      clickToggle = <FaChevronUp className={styles["down-icon"]} size={16} />;
    }


    if (!!selectedApp && !!selectedApp.recommendations) {
      for (let result of selectedApp.recommendations) {
        let doc = _.find(sizingRuns, { nodetype: result.nodetype });
        switch (result.objective) {
          case "MaxPerfOverCost":
            optimal = doc;
            break;
          case "MinCostWithPerfLimit":
            lowCost = doc;
            break;
          case "MaxPerfWithCostLimit":
            highPerf = doc;
            break;
        }
      }

      returnTable = (
        <table className={`${styles.ResultTable} ${className}`}>
          <thead>
            <tr>
              <th></th>
              <th>Instance Type</th>
              <th>Perf</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles["single-result"]}>
              <td>
                <i className={styles["optimal-perf-cost"]} />
                Optimal Perf/Cost
              </td>
              <td>{optimal.nodetype}</td>
              <td>{optimal.qosValue.toFixed(2)}</td>
              <td>{"$" + optimal.cost.toFixed(2)}</td>
            </tr>
            <tr className={styles["single-result"]}>
              <td>
                <i className={styles["optimal-perf"]} />
                High performance
              </td>
              <td>{highPerf.nodetype}</td>
              <td>{highPerf.qosValue.toFixed(2)}</td>
              <td>{"$" + highPerf.cost.toFixed(2)}</td>
            </tr>
            <tr className={styles["single-result"]}>
              <td>
                <i className={styles["optimal-cost"]} />
                Low cost
              </td>
              <td>{lowCost.nodetype}</td>
              <td>{lowCost.qosValue.toFixed(2)}</td>
              <td>{"$" + lowCost.cost.toFixed(2)}</td>
            </tr>
            {this.state.otherTests.map(app => (
              <tr className={styles["single-result"]}>
                <td>
                  <i className={styles["other-test"]}/>
                    Round {app.testRound}
                </td>
                <td>{app.nodetype}</td>
                <td>{app.qosValue.toFixed(2)}</td>
                <td>{"$" + app.cost.toFixed(2)}</td>
              </tr>
            ))}

            <tr className={styles["see-all"]}>
              <td colSpan="4">
                <a onClick={() => this.toggleOtherTests()}>
                  {clickToggleTxt}{clickToggle}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      returnTable = (
        <table className={`${styles.ResultTable} ${className}`}>
          <thead>
            <tr>
              <th></th>
              <th>Instance Type</th>
              <th>Perf</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">
                Not yet tested. No result.
            </td>
            </tr>
          </tbody>
        </table>
      );
    }
    return returnTable;
  }

}
 

export default connect(mapStateToProps)(ResultTable);
