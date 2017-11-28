import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import { navLogo } from "~/assets";
import rootReducer from "./reducers";
import DashboardPage from "./containers/DashboardPage";
import SetupEdit from "./containers/appSetup/SetupEdit";
import SetupDone from "./containers/appSetup/SetupDone";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, apiMiddleware),
    /* eslint-disable no-underscore-dangle */
    process.env.NODE_ENV === "production" || !window.__REDUX_DEVTOOLS_EXTENSION__
      ? f => f
      : window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable */
  ),
);

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <div className="navbar navbar-light bg-light">
          <div className="container">
            <Link to="/">
              <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
            </Link>
          </div>
        </div>
        <Switch>
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/apps/new" component={SetupEdit} />
          <Route path="/apps/:appId/edit/:step" component={SetupEdit} />
          <Route path="/setup/add/:step" component={SetupEdit} />
          <Route path="/setup/done" component={SetupDone} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </div>
    </Router>
  </Provider>
);
