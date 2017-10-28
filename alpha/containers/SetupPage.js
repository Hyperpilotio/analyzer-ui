import React from "react";
import { connect } from "react-redux";
import ProgressBar from "~/commons/components/ProgressBar";
import { fetchApps } from "../actions";


class SetupPage extends React.Component {
  componentWillMount() {
    this.props.fetchApps();
  }

  render() {
    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col">
            <h3>SETUP HYPERPILOT</h3>
            <ProgressBar percent={this.props.stepPercent} />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <ul className="nav nav-secondary nav-pills nav-fill">
              <li className="nav-item nav-link text-primary">Step 1: Select Applications</li>
              <li className="nav-item nav-link text-secondary">Step 2: Define SLO</li>
              <li className="nav-item nav-link text-secondary">Step 3: Begin HyperPiloting</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ setup }) => ({
  stepPercent: setup.stepPercent,
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupPage);
