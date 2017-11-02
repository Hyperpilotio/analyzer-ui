import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Table } from "reactstrap";
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
