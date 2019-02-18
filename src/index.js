import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

import Vulnerabilities from "./models/Vulnerabilities";
import VulnerabilityList from "./views/VulnerabilityList";

const store = new Vulnerabilities();
ReactDOM.render(
    <VulnerabilityList vulnerabilities={store} />, 
    document.getElementById('root')
);
