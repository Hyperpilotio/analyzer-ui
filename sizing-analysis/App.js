import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HeaderNav from "../commons/components/HeaderNav";
import NavItemLink from "../commons/components/NavItemLink";


export default () => (
  <Router>
    <Switch>
      <Route path="/" children={({ history }) => (
        <div>
          <HeaderNav history={history}>
            <NavItemLink to="/configuration" text="Configuration" />
            <NavItemLink to="/benchmark-test" text="Benchmark Test" />
          </HeaderNav>
        </div>
      )} />
    </Switch>
  </Router>
)
