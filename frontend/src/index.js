import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

import hello from './components/hello.js';
hello('World');

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
