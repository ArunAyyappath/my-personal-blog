import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./component/homePage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import loginReducer from "./reducers/login-reducer";

const rootReducers = combineReducers({
  login: loginReducer
});
//window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(rootReducers);

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
