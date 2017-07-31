import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HeaderNav from "../commons/components/HeaderNav";


export default () => (
  <Router>
    <Switch>
      <Route path="/" children={({ history }) => (
        <div>
          <HeaderNav history={history} />
        </div>
      )} />
    </Switch>
  </Router>
)
