import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import GrandDashboard from "./containers/GrandDashboard";
import EntryPage from "./containers/EntryPage";
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
      <GrandDashboard>
        <Switch>
          <Route path="/dashboard" component={EntryPage} />
          <Route path="/result/:type" />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </GrandDashboard>
    </Router>
  </Provider>
);
