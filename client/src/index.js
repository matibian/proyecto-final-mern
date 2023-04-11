import React from "react";
import ReactDOM from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Login from "./components/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
const token = localStorage?.getItem("token");

root.render(
  <>
    <HashRouter>{token ? <App /> : <Login />} </HashRouter>
  </>
);

reportWebVitals();
