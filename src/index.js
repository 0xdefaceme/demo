//@format
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { MobxRouter, RouterStore, startRouter, Route } from "mobx-router";
import ipfsClient from "ipfs-http-client";

import "foundation-sites/dist/css/foundation.min.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "highlight.js/styles/solarized-light.css";

import views from "./views";
import { getWeb3, getWeb3Anon } from "./utils/getWeb3";
import config from "./config";

import App from "./views/App";

import Vulnerabilities from "./stores/Vulnerabilities";
import Vulnerability from "./stores/Vulnerability";

async function boot() {
  let web3, account;
  try {
    web3 = await getWeb3();
    account = (await web3.eth.getAccounts())[0];
  } catch (err) {
    console.log(err);
  }
  const ipfs = ipfsClient(config.IPFS_PROVIDER, "5001", { protocol: "https" });

  const store = {
    web3,
    ipfs,
    account,
    vulnerabilities: new Vulnerabilities(),
    vulnerability: new Vulnerability(),
    router: new RouterStore()
  };

  startRouter(views, store, { html5history: false });

  ReactDOM.render(
    // NOTE: We inject `store` here as mobx will otherwise throw an error.
    // We're however only injecting individual stores and never the global
    // store in the views!
    <Provider store={store} {...store}>
      <App>
        <MobxRouter />
      </App>
    </Provider>,
    document.getElementById("root")
  );
}
boot();
