import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import CalibrationChartComponent from "../components/CalibrationChart";


export default class CalibrationChart extends Component {

  static contextTypes = {
    store: PropTypes.object,
    actions: PropTypes.object
  }

  state = { data: null, loading: true }

  async fetchData(appId) {
    if (_.isUndefined(_.get(this.context.store.calibrations, appId))) {
      await this.context.actions.fetchCalibration(appId)
    }
    this.setState({
      data: this.context.store.calibrations[appId],
      loading: false
    });
  }

  componentDidMount() {
    this.fetchData(this.props.appId);
  }

  componentWillReceiveProps(props) {
    if (props.appId !== this.props.appId) {
      this.setState({loading: true});
      this.fetchData(props.appId);
    }
  }

  render() {
    return <CalibrationChartComponent {...this.state} />
  }

}