import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import GlobalStyles from "./styles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyles />
    <Router />
  </>
);
