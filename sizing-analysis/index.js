import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducers from './reducers';
import "./index.scss";

const store = createStore(reducers);
const rootEl = document.getElementById("react-root");
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
         <Component />
      </Provider>
    </AppContainer>,
    rootEl
  );

render(App);
if (module.hot) {
  module.hot.accept("./App", () => {
    const App = require("./App").default;
    render(App);
  });
}
