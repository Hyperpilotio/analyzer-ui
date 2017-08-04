import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, hasHistory, Link } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import AutopilotPage from "./components/AutopilotPage";
import UserAuth from "./components/UserAuth";
import PropTypes from "prop-types";
import _ from "lodash";
import { Provider, connect } from 'react-redux';
import { appStore, mapStateToProps, mapDispatchToProps } from './containers/AppReducer';
import { CSSTransitionGroup } from 'react-transition-group';

//can not use import because it will be set as const variable
let AppProvider = require("./containers/AppProvider");
let DashboardHome = require("./components/DashboardHome");
let AppPage = require("./containers/AppPage");


DashboardHome = connect(mapStateToProps, mapDispatchToProps)(DashboardHome);
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
  click(page){
  }

  render() {
    console.log(this.tranNm);
    return (
      <Router key="router" history={hasHistory}>
        <Switch>
          <Route key="route_user_auth" path="/login" component={UserAuth} />
          <Route key="route_root" path="/" children={({ location }) => (
            <div>
<<<<<<< HEAD
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
=======
              <HeaderNav key="header_nav" onClick={this.click}/>
              <CSSTransitionGroup key="route_css_transition" 
                 transitionName="upper"
                 transitionEnterTimeout={500}
                 transitionLeaveTimeout={500}>
                <Switch key={location.key} location={location} >
                  <Route location={location} key={location.key + "_1"} path="/dashboard" component={DashboardHome}  />
                  <Route location={location} key={location.key + "_2"} path="/autopilot" component={AutopilotPage} />
                  <Route location={location} key={location.key + "_0"} path="/apps/:appId" component={AppPage} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </CSSTransitionGroup>
>>>>>>> reset and push again
            </div>
          )} />
        </Switch>

      </Router>
    );
  }
}


AppProvider = connect(mapStateToProps, mapDispatchToProps)(AppProvider);
App = connect(mapStateToProps, mapDispatchToProps)(App);
//console.log(App);
export default () => (
  <Provider store={appStore}>
      <AppProvider>
          <App />
      </AppProvider>
  </Provider>
);


//App = connect()(App);
