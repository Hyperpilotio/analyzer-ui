import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./AppReducer";
import _ from "lodash";


class AppProvider extends Component {

  state = {
    cluster: {},
    apps: {},
    calibrations: {},
    profilings: {},
    interferences: {},
    recommendations: {}
  }

  getStateContext() {
    return {
      myStore: this.state,
      actions: {
        getApps: ::this.getApps,
        fetchServicePlacement: ::this.fetchServicePlacement,
        fetchCalibration: ::this.fetchCalibration,
        fetchProfiling: ::this.fetchProfiling,
        fetchInterference: ::this.fetchInterference,
        fetchAppInfo: ::this.fetchAppInfo
      }
    };
  }
    
  async getApps() {
    let res = await fetch(`/api/apps`);
    if (!res.ok) {
      console.error("Unexpected error for", res);
      return;
    }
    let data = await res.json();
    this.setState({
      apps: _.mapValues(data, (app, _id) => _.assign({}, this.state.apps[_id], app))
    });
    this.props.setApps(_.mapValues(data, (app, _id) => _.assign({}, this.state.apps[_id], app)));
  }

  async fetchServicePlacement(recommended = false) {
    let res = await fetch(`/api/cluster${ recommended ? "/recommended" : "" }`);
    if (!res.ok) {
      console.error("Unexpected error for", res);
      return;
    }
    let data = await res.json();
    if (recommended) {
      this.setState({
        recommendations: update(this.state.recommendations, { placement: { $set: data } })
      });
      this.props.setRecommendations(update(this.state.recommendations, { placement: { $set: data } }));
    } else {
      this.setState({ cluster: data });
      this.props.setCluster(data);        
    }
  }

  async fetchAppInfo(appId) {
    let res = await fetch(`/api/apps/${appId}`);
    if (!res.ok) {
      console.error("Unexpected error for", res);
      return;
    }
    let data = await res.json();
    this.setState({
      apps: update(
        this.state.apps,
        _.fromPairs([[ appId, { $set: data } ]])
      )
    });
    this.props.setApps(update(
      this.state.apps, _.fromPairs([[ appId, { $set: data } ]])
    ));
  }

  async fetchCalibration(appId) {
    let res = await fetch(`/api/apps/${appId}/calibration`);
    if (!res.ok) {
      console.error("Unexpected error for", res);
      return;
    }
    let data = await res.json();
    this.setState({
      calibrations: update(
        this.state.calibrations,
        _.fromPairs([[appId, {$set: data}]])
      )
    });
    this.props.setCalibrations(update(
      this.state.calibrations,
      _.fromPairs([[appId, {$set: data}]])
    ));
  }

  async fetchProfiling(appId, serviceName) {
    let res = await fetch(`/api/apps/${appId}/services/${serviceName}/profiling`);
    if (!res.ok) {
      console.error("Unexpected error for", res);
      return;
    }
    let data = await res.json();
    this.setState({
      profilings: update(
        this.state.profilings,
        _.fromPairs([[`${appId}-${serviceName}`, {$set: data}]])
      )
    });
    this.props.setProfilings(update(
      this.state.profilings,
      _.fromPairs([[`${appId}-${serviceName}`, {$set: data}]])
    ));
  }

  async fetchInterference(appId, serviceName) {
    let res = await fetch(`/api/apps/${appId}/services/${serviceName}/interference`);
    if (!res.ok) {
      console.error("Unexpected error for", res);
      return;
    }
    let data = await res.json();
    this.setState({
      interferences: update(
        this.state.interferences,
        _.fromPairs([[`${appId}-${serviceName}`, {$set: data}]])
      )
    });
    this.props.setInterferences(update(
      this.state.interferences,
      _.fromPairs([[`${appId}-${serviceName}`, {$set: data}]])
    ));
  }
  
  //must set state well before component mount      
  componentWillMount() {
    let actions = this.getStateContext().actions;
    this.props.setAllActions(actions);
    this.props.setMyState(this.getStateContext().myStore);
  }


  render() {
    return Children.only(this.props.children);
  }

}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProvider)
