import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Assets/css/bootstrap-icons.css";

import "./Assets/css/landing.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

reportWebVitals();
