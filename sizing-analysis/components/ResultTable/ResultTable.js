import React, {Component} from "react";
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
      selected_app: this.getSelectedApp(props)
    }
    this.toggleOtherTests = this.toggleOtherTests.bind(this);
  }
  getSelectedApp(props) {
    for (let app of props.selected_apps) {
      if (props.id === app.appId) {
        return app;
      }
    }
  }

  toggleOtherTests() {
    let otherTests = [];
    let toggleOn = !this.state.toggleOn;
    if(toggleOn){
      if (!!this.state.selected_app.sizingRuns) {
        for (let sizingRun of this.state.selected_app.sizingRuns) {
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
      if(this.props.id !== nextProps.id){
        this.setState({
          otherTests: [],
          toggleOn: false,
          selected_app: this.getSelectedApp(nextProps)
        });
      }
  }



  render() {
    let className = this.props.className;
    let selected_app = this.state.selected_app;
    let returnTable;
    let optimal;
    let highPerf;
    let lowCost;
    let clickToggleTxt = "See all tested instances";
    let clickToggle = <FaChevronDown className={styles["down-icon"]} size={16} />;
    if(this.state.toggleOn){
      clickToggleTxt = "Hide other tested instances"; 
      clickToggle = <FaChevronUp className={styles["down-icon"]} size={16} />;

    }


    if (!!selected_app && !!selected_app.recommendations) {
      for (let result of selected_app.recommendations) {
        switch (result.objective) {
          case "MaxPerfOverCost":
            highPerf = result;
            break;
          case "MinCostWithPerfLimit":
            lowCost = result;
            break;
          case "MaxPerfWithCostLimit":
            optimal = result;
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
              <td>{optimal.performance}</td>
              <td>{"$" + optimal.cost}</td>
            </tr>
            <tr className={styles["single-result"]}>
              <td>
                <i className={styles["optimal-perf"]} />
                High performance
        </td>
              <td>{highPerf.nodetype}</td>
              <td>{highPerf.performance}</td>
              <td>{"$" + highPerf.cost}</td>
            </tr>
            <tr className={styles["single-result"]}>
              <td>
                <i className={styles["optimal-cost"]} />
                Low cost
              </td>
              <td>{lowCost.nodetype}</td>
              <td>{lowCost.performance}</td>
              <td>{"$" + lowCost.cost}</td>
            </tr>
            {this.state.otherTests.map(app => (
              <tr className={styles["single-result"]}>
                <td>
                  <i className={styles["other-test"]}/>
                    Round {app.testRound}
                </td>
                <td>{app.nodetype}</td>
                <td>{Math.round(app.perfOverCost * 10) / 10}</td>
                <td>{"$" + Math.round(app.cost * 10) / 10}</td>
              </tr>
              )
            )}

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
      returnTable = (<table className={`${styles.ResultTable} ${className}`}>
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
      </table>);
    }
    return returnTable;
  }

}
 

export default connect(mapStateToProps)(ResultTable);
