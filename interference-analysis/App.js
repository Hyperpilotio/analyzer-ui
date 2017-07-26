import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HeaderNav from "../commons/components/HeaderNav";
import NavItemLink from "../commons/components/NavItemLink";
import DashboardHome from "./components/DashboardHome";
import AutopilotPage from "./components/AutopilotPage";
import AppPage from "./containers/AppPage";
import UserAuth from "./components/UserAuth";
//import AppProvider from "./containers/AppProvider";
import PropTypes from "prop-types";
import _ from "lodash";
import { Provider, connect } from 'react-redux';
import { appStore } from './containers/AppReducer'

let AppProvider = require("./containers/AppProvider");
class App extends Component {
  constructor(props) {
     super(props);
  }
    
  static contextTypes = {
    actions: PropTypes.object,
    myStore: PropTypes.object
  }

  componentDidMount() {
    if (_.keys(this.context.myStore.apps).length === 0)
      this.context.actions.getApps();
  }

  render() {
    return (
      <Router>

        <Switch>
          <Route path="/login" component={UserAuth} />
          <Route path="/" children={({ history }) => (
            <div>
              <HeaderNav history={history}>
                <NavItemLink to="/dashboard" text="Dashboard" />
                <NavItemLink to="/autopilot" text="Autopilot" />
                <NavItemLink to="/apps" text="Apps" />
                <NavItemLink to="/services" text="Services" />
              </HeaderNav>
              <Switch>
                <Route path="/dashboard" component={DashboardHome} />
                <Route path="/autopilot" component={AutopilotPage} />
                <Route path="/apps/:appId" component={AppPage} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </div>
          )} />
        </Switch>

      </Router>
    );
  }
}

function mapStateToProps(state) {
    return {
        cluster: state.cluster,
        apps: state.apps,
        calibrations: state.calibrations,
        profilings: state.profilings,
        interferences: state.interferences,
        recommendations: state.recommendations
    };
}

AppProvider = connect(mapStateToProps)(AppProvider);
//console.log(App);
ReactDOM.render(
export default () => (
  <Provider store={appStore}>
      <AppProvider>
          <App />
      </AppProvider>
  </Provider>
);
//App = connect()(App);
