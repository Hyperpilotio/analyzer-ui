import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
// import _ from "lodash";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Row, Table } from "reactstrap";
import bindActionCreatorHoc from "../lib/bindActionCreatorHoc";
import SizingGraph from "../components/SizingGraph";
import ChartGroup from "../components/ChartGroup/ChartGroup";
import SideBar from "../components/SideBar";
import PercentCalc from "../components/PercentCalc/PercentCalc";
import _s from "./style.scss";


const slo = {
  threshold: {
    type: "UB",
    value: 0,
    unit: "ms",
  },
  metric: {
    name: "",
    type: "latency",
    tags: [],
  },
};

/* eslint-disable */
class ResultPage extends React.Component {
  static propTypes = {
  }

  toggleSideBar = () => {
    this.props.compsAction.toggleSideBar();
  }

  render() {
    const { currContainer } = this.props;
    return (
      <div>
        <SideBar />
        {/* TAB */}
        <Row>
          <NavLink to="/result/container/cpu" activeClassName={_s.tabActive} className={_s.tab} >CPU</NavLink>
          <NavLink to="/result/container/memory" activeClassName={_s.tabActive} className={_s.tab} >Memory</NavLink>
          <button
            className={_s.addBtn}
            onClick={this.toggleSideBar}
          >Select new tuple +</button>
        </Row>
        {/* TABLE */}
        <Row>
          <Table className={_s.table} bordered hover>
            <thead>
              <tr>
                <th>App label</th>
                <th>Image label</th>
                <th>Username</th>
                <th>Current Request</th>
                <th>Suggested Request</th>
                <th>Current Limit</th>
                <th>Suggested Limit</th>
              </tr>
            </thead>
            <tbody>
              {
                currContainer.results.map(d => (
                  <tr>
                    <td>{d.label_values.app}</td>
                    <td>{d.label_values.image}</td>
                    <td>Toby</td>
                    <td>
                      {d.current_settings.requests}
                    </td>
                    <td>
                      {d.recommended_settings.requests}
                      <PercentCalc
                        top={d.recommended_settings.requests}
                        bottom={d.current_settings.requests}
                        style={{ marginRight: "10%", float: "right" }}
                        opposite
                      />
                    </td>
                    <td>
                      {d.current_settings.limits}
                    </td>
                    <td>
                      {d.recommended_settings.limits}
                      <PercentCalc
                        top={d.recommended_settings.limits}
                        bottom={d.current_settings.limits}
                        style={{ marginRight: "0%", float: "right" }}
                        opposite />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Row>

        {/* CHART */}
        <Row>
          <ChartGroup>
            <h5 className="text-left mb-3">
              CPU
              {/* {_.words(currData.resource).map(_.capitalize).join(" ")} */}
            </h5>
            <SizingGraph slo={slo} />
          </ChartGroup>
        </Row>

      </div>
    );
  }
}
/* eslint-enable */
const mapStateToProps = ({ result }) => ({
  currContainer: result.currContainer,
});


export default compose(
  connect(
    mapStateToProps,
  ),
  bindActionCreatorHoc,
)(ResultPage);
