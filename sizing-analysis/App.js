import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HeaderNav from "../commons/components/HeaderNav";
import NavItemLink from "../commons/components/NavItemLink";
import SizingRunnerPage from "./components/SizingRunnerPage";


export default () => (
  <Router>
    <Switch>
      <Route path="/" children={({ history }) => (
        <div>
          <HeaderNav history={history}>
            <NavItemLink to="/sizing-test" text="Sizing Analysis" />
          </HeaderNav>
          <Switch>
            <Route path="/sizing-test" component={SizingRunnerPage} />
            <Redirect from="/" to="/sizing-test" />
          </Switch>
        </div>
      )} />
    </Switch>
  </Router>
)
