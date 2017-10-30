import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProgressBar from "~/commons/components/ProgressBar";
import { fetchApps } from "../actions";


class SetupPage extends React.Component {
  componentWillMount() {
    this.props.fetchApps();
  }

  render() {
    const {
      stepPercent,
    } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col">
            <h3>SETUP HYPERPILOT</h3>
            <ProgressBar percent={stepPercent} />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <ul className="nav nav-secondary nav-pills nav-fill">
              <li className={`nav-item nav-link ${stepPercent > 0 ? "text-primary" : "text-secondary"}`}>Step 1: Select Applications</li>
              <li className={`nav-item nav-link ${stepPercent > 34 ? "text-primary" : "text-secondary"}`}>Step 2: Define SLO</li>
              <li className={`nav-item nav-link ${stepPercent > 70 ? "text-primary" : "text-secondary"}`}>Step 3: Begin HyperPiloting</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

SetupPage.propTypes = {
  stepPercent: PropTypes.number.isRequired,
  fetchApps: PropTypes.func.isRequired,
};

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
