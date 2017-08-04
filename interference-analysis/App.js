import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HeaderNav from "commons/components/HeaderNav";
import NavItemLink from "commons/components/NavItemLink";
import DashboardHome from "./components/DashboardHome";
import AutopilotPage from "./components/AutopilotPage";
import UserAuth from "./components/UserAuth";
import PropTypes from "prop-types";
import _ from "lodash";
import { Provider, connect } from 'react-redux';
import { appStore, mapStateToProps, mapDispatchToProps } from './containers/AppReducer';

//can not use import because it will be set as const variable
let AppProvider = require("./containers/AppProvider");
let AppPage = require("./containers/AppPage");


AppPage = connect(mapStateToProps, mapDispatchToProps)(AppPage);
class App extends Component {
  constructor(props) {
     super(props);
  }

  componentDidMount() {
    if (_.keys(this.props.apps).length === 0){
      this.props.actions.getApps();
    }
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


AppProvider = connect(mapStateToProps, mapDispatchToProps)(AppProvider);
App = connect(mapStateToProps, mapDispatchToProps)(App);
export default () => (
  <Provider store={appStore}>
      <AppProvider>
          <App />
      </AppProvider>
  </Provider>
);

