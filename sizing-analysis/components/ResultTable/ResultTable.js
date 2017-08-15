import React from "react";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import styles from "./ResultTable.scss";
import { connect } from 'react-redux';
import { mapStateToProps } from "../../actions";


const ResultTable = (props) => {
  let selected_app;
  for(let app of props.selected_apps){
    if(props.id === app.appId){
       selected_app = app;
       break;
    }
  }
  let returnTable;
  let optimal;
  let highPerf;
  let lowCost;
  if(!!selected_app && !!selected_app.recommendations){
    for(let result of selected_app.recommendations){
       switch(result.objective){
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
      <table className={`${styles.ResultTable} ${props.className}`}>
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
          <tr className={styles["see-all"]}>
            <td colSpan="4">
              See all tested instances
          <FaChevronDown className={styles["down-icon"]} size={16} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }else{
    returnTable = (  <table className={`${styles.ResultTable} ${props.className}`}>
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
};

export default connect(mapStateToProps)(ResultTable);
