import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HeaderNav from "../commons/components/HeaderNav";
import NavItemLink from "../commons/components/NavItemLink";
import SizingRunnerPage from "./components/SizingRunnerPage";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "./constants";


export default () => (
  <Router>
    <Switch>
      <Route path="/" children={({ history }) => (
        <div>
          <HeaderNav history={history}>
            <NavItemLink to="/sizing-test" text="Sizing Analysis" />
          </HeaderNav>
          <Switch>
            <Route path="/sizing-test">
              <Switch>
                <Route path="/sizing-test/run-test" render={() => <SizingRunnerPage stage={STAGE_TEST} />} />
                <Route path="/sizing-test/result" render={() => <SizingRunnerPage stage={STAGE_RESULT} />} />
                <Route render={() => <SizingRunnerPage stage={STAGE_CONFIG} />} />
              </Switch>
            </Route>
            <Redirect from="/" to="/sizing-test" />
          </Switch>
        </div>
      )} />
    </Switch>
  </Router>
)
