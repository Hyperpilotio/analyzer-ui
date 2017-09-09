import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "../commons/components/Header";
import SizingRunnerPage from "./components/SizingRunnerPage";
import SizingResultsPage from "./components/SizingResultsPage";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "./constants";


export default () => (
  <Router>
    <Switch>
      <Route path="/" children={({ history }) => (
        <div>
          <Header />
          <Switch>
            <Route path="/sizing-test">
              <Switch>
                <Route path="/sizing-test/run-test" render={props => <SizingRunnerPage stage={STAGE_TEST} {...props} />} />
                <Route path="/sizing-test/result/:appName" component={SizingResultsPage} />
                <Route path="/sizing-test/result" component={SizingResultsPage} />
                <Route render={props => <SizingRunnerPage stage={STAGE_CONFIG} {...props} />} />
              </Switch>
            </Route>
            <Redirect from="/" to="/sizing-test" />
          </Switch>
        </div>
      )} />
    </Switch>
  </Router>
)
