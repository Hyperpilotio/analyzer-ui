import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import { navLogo } from "~/assets";
import FaSignOut from "react-icons/lib/fa/sign-out";
import rootReducer from "./reducers";
import AppDashboard from "./containers/AppDashboard";
import GrandDashboard from "./containers/GrandDashboard";
import SetupEdit from "./containers/appSetup/SetupEdit";
import SetupDone from "./containers/appSetup/SetupDone";
import CommonModal from "./components/CommonModal";
import Header from "./containers/Header";
import Login from "./containers/Login";
import { isUserAuthenticated, deauthenticateUser } from "./lib/auth";

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
        {/* header */}
        <Header />
       
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard/:appId" component={AppDashboard} />
          <Route path="/dashboard" component={GrandDashboard} />
          <Route path="/apps/new" component={SetupEdit} />
          <Route path="/apps/:appId/edit/done" component={SetupDone} />
          <Route path="/apps/:appId/edit/:step" component={SetupEdit} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
        <CommonModal />
      </div>
    </Router>
  </Provider>
);
