import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

import Vulnerability from "./models/Vulnerability";
import VulnerabilityView from "./views/Vulnerability";

const store = new Vulnerability();
ReactDOM.render(
    <VulnerabilityView vulnerability={store} />, 
    document.getElementById('root')
);
