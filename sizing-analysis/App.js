import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import Header from "../commons/components/Header";
import SizingRunnerPage from "./components/SizingRunnerPage";
import SizingResultsPage from "./components/SizingResultsPage";
import { STAGE_CONFIG, STAGE_TEST } from "./constants";
import reducers from "./reducers";
import "./index.scss";

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  // Activate redux devtools in development mode
  process.env.NODE_ENV === "production"
    ? undefined
    : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

persistStore(store);


export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/">
          <div>
            <Header />
            <Switch>
              <Route path="/sizing-test">
                <Switch>
                  <Route
                    path="/sizing-test/run-test"
                    render={props => <SizingRunnerPage stage={STAGE_TEST} {...props} />}
                  />
                  <Route
                    path="/sizing-test/result/:appName"
                    component={SizingResultsPage}
                  />
                  <Route
                    path="/sizing-test/result"
                    component={SizingResultsPage}
                  />
                  <Route
                    render={props => <SizingRunnerPage stage={STAGE_CONFIG} {...props} />}
                  />
                </Switch>
              </Route>
              <Redirect from="/" to="/sizing-test" />
            </Switch>
          </div>
        </Route>
      </Switch>
    </Router>
  </Provider>
);
