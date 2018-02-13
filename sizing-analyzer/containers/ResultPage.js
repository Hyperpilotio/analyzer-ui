import React from "react";
import { connect } from "react-redux";
// import _ from "lodash";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Row, Table } from "reactstrap";
import _ from "lodash";
import SizingGraph from "../components/SizingGraph";
import _s from "./style.scss";
import ChartGroup from "../components/ChartGroup/ChartGroup";

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
class EntryPage extends React.Component {
  static propTypes = {
  }
  componentWillMount() {
  }
  render() {
    const { currData } = this.props;
    return (
      <div>
        {/* TAB */}
        <Row>
          <NavLink to="/result/container/cpu" activeClassName={_s.tabActive} className={_s.tab} >CPU</NavLink>
          <NavLink to="/result/container/memory" activeClassName={_s.tabActive} className={_s.tab} >Memory</NavLink>
        </Row>
        {/* TABLE */}
        <Row>
          <Table bordered hover>
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
                currData.results.map(d => (
                  <tr>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>{d.current_settings.size}</td>
                    <td>{d.recommended_settings.size}</td>
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
              {_.words(currData.resource).map(_.capitalize).join(" ")}
            </h5>
            <SizingGraph slo={slo} />
          </ChartGroup>
        </Row>


      </div>
    );
  }
}

const mapStateToProps = ({ result }) => ({
  currData: result.currData,
});


export default connect(
  mapStateToProps,
)(EntryPage);
