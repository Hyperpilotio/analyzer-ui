import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import App from "./App";
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

const render = (Component) => {
  const rootEl = document.getElementById("react-root");
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl,
  );
};

render(App);

if (process.env.NODE_ENV !== "production" && module.hot) {
  /* eslint-disable no-shadow, global-require */
  module.hot.accept("./App", () => {
    const App = require("./App").default;
    render(App);
  });
  /* eslint-enable */
}
