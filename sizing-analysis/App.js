import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HeaderNav from "../commons/components/HeaderNav";
import NavItemLink from "../commons/components/NavItemLink";
import BenchmarkRunnerPage from "./components/BenchmarkRunnerPage";


export default () => (
  <Router>
    <Switch>
      <Route path="/" children={({ history }) => (
        <div>
          <HeaderNav history={history}>
            <NavItemLink to="/benchmark-test" text="Benchmark Test" />
          </HeaderNav>
          <Switch>
            <Route path="/benchmark-test" component={BenchmarkRunnerPage} />
            <Redirect from="/" to="/benchmark-test" />
          </Switch>
        </div>
      )} />
    </Switch>
  </Router>
)
