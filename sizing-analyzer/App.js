import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import { navLogo } from "~/assets";
import rootReducer from "./reducers";
import GrandDashboard from "./containers/GrandDashboard";
import _s from "./style.scss";
// import CommonModal from "./components/CommonModal";

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
        <div className={`navbar navbar-light bg-light ${_s.navBar}`}>
          <Link to="/">
            <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
            <span className={_s.navTitle}>HyperPilot Sizing Analyzer</span>
          </Link>
        </div>

        <Switch>
          <Route path="/dashboard" component={GrandDashboard} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
        {/* <CommonModal /> */}
      </div>
    </Router>
  </Provider>
);
