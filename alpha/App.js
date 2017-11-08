import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { navLogo } from "~/assets";
import rootReducer from "./reducers";
import DashboardPage from "./containers/DashboardPage";
import SetupList from "./containers/Setup/SetupList";
import SetupEdit from "./containers/Setup/SetupEdit";
import SetupDone from "./containers/Setup/StepDone";


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
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
            <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
          </div>
        </div>
        <Route path="/dashboard" component={DashboardPage} />
        <Route exact path="/setup" component={SetupList} />
        <Route path="/setup/add" component={SetupEdit} />
        <Route path="/setup/edit" component={SetupEdit} />
        <Route path="/setup/done" component={SetupDone} />
      </div>
    </Router>
  </Provider>
);
