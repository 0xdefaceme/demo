import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import {MobxRouter, RouterStore, startRouter, Route} from 'mobx-router';

import views from "./views";

import Vulnerabilities from "./stores/Vulnerabilities";
import Vulnerability from "./stores/Vulnerability";

const store = {
    vulnerabilities: new Vulnerabilities(),
    vulnerability: new Vulnerability(),
    router: new RouterStore()
}

startRouter(views, store);

ReactDOM.render(
    <Provider store={store}>
        <MobxRouter />
    </Provider>,
    document.getElementById('root')
);
