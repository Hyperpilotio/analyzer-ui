import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import InterferenceChartComponent from "../components/InterferenceChart";


export default class InterferenceChart extends Component {

  // static contextTypes = {
  //   myStore: PropTypes.object,
  //   actions: PropTypes.object
  // }

  state = { data: null, loading: true };

  async fetchData(appId, serviceName) {
    // if (!_.has(this.context.myStore.interferences, `${appId}-${serviceName}`)) {
    //   await this.context.actions.fetchInterference(appId, serviceName);
    // }
    if (!_.has(this.props.interferences, `${appId}-${serviceName}`)) {
      await this.props.actions.fetchInterference(appId, serviceName);
    }
    this.setState({
      data: this.props.interferences[`${appId}-${serviceName}`],
      loading: false
    });
  }

  componentDidMount() {
    this.fetchData(this.props.appId, this.props.serviceName);
  }

  componentWillReceiveProps(props) {
    if (props.appId !== this.props.appId || props.serviceName !== this.props.serviceName) {
      this.setState({loading: true});
      this.fetchData(props.appId, props.serviceName);
    }
  }

  render() {
    return <InterferenceChartComponent {...this.state} />
  }

}
module.exports = InterferenceChart;
