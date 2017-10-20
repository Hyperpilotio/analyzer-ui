import React from "react";
import ReactDOM from "react-dom";
import { AppContainer as ReactHotLoaderContainer } from "react-hot-loader";
import App from "./App";


const render = (Component) => {
  const rootEl = document.getElementById("react-root");
  ReactDOM.render(
    <ReactHotLoaderContainer>
      <Component />
    </ReactHotLoaderContainer>,
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
