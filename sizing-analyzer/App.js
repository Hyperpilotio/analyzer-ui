import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import GrandDashboard from "./containers/GrandDashboard";
import EntryPage from "./containers/EntryPage";
import ResultPage from "./containers/ResultPage";
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
        <Route exact path="/result/:scale/:type" component={ResultPage} />
        <Route exact path="/result/:scale" component={ResultPage} />
        <Route exact path="/" component={EntryPage} />
      </GrandDashboard>
    </Router>
  </Provider>
);
