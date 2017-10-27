import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { navLogo } from "~/assets";
import reducer from "./reducers";
import SetupPage from "./containers/SetupPage";
import DashboardPage from "./containers/DashboardPage";
import StepOne from "./containers/StepOne";
import StepTwo from "./containers/StepTwo";
import StepThree from "./containers/StepThree";

const store = createStore(
  reducer,
  {
    apps: [
      { name: "goddd", id: "1" },
      { name: "lucene", id: "2" },
      { name: "kafka", id: "3" },
      { name: "memcached", id: "4" },
      { name: "mongo", id: "5" },
      { name: "mysql", id: "6" },
      { name: "nginx", id: "7" },
      { name: "spark", id: "8" },
      { name: "dashboard", id: "9" },
    ],
    addedAppIds: [],
  },
  /* eslint-disable no-underscore-dangle */
  process.env.NODE_ENV === "production"
    ? undefined
    : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
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
        <Route path="/setup" component={SetupPage} />
        <Route path="/setup/stepOne" component={StepOne} />
        <Route path="/setup/stepTwo" component={StepTwo} />
        <Route path="/setup/stepThree" component={StepThree} />
      </div>
    </Router>
  </Provider>
);
