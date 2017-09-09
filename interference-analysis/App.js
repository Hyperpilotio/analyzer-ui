import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "commons/components/Header";
import NavItemLink from "commons/components/NavItemLink";
import DashboardHome from "./components/DashboardHome";
import AutopilotPage from "./components/AutopilotPage";
import AppPage from "./containers/AppPage";
import UserAuth from "./components/UserAuth";
import AppProvider from "./containers/AppProvider";
import PropTypes from "prop-types";
import _ from "lodash";
import { Provider, connect } from 'react-redux';
import { appStore, mapStateToProps, mapDispatchToProps } from './containers/AppReducer';


class App extends Component {

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
              { /* Temporary fix for Header, Header should accept children as props in the future */ }
              <Header history={history}>
                <NavItemLink to="/dashboard" text="Dashboard" />
                <NavItemLink to="/autopilot" text="Autopilot" />
                <NavItemLink to="/apps" text="Apps" />
                <NavItemLink to="/services" text="Services" />
              </Header>
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


App = connect(mapStateToProps, mapDispatchToProps)(App);

export default () => (
  <Provider store={appStore}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);

