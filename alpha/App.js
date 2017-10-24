import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { navLogo } from "~/assets";
import SetupPage from "./containers/SetupPage";
import DashboardPage from "./containers/DashboardPage";


export default () => (
  <Router>
    <div>
      <div className="navbar navbar-light bg-light">
        <div className="container">
          <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
        </div>
      </div>
      <Route path="/setup" component={SetupPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </div>
  </Router>
);
