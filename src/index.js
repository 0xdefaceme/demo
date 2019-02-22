import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import { MobxRouter, RouterStore, startRouter, Route } from 'mobx-router';
import ipfsClient from 'ipfs-http-client';

import 'foundation-sites/dist/css/foundation.min.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import views from "./views";
import getWeb3 from "./utils/getWeb3";
import config from "./config";

import Vulnerabilities from "./stores/Vulnerabilities";
import Vulnerability from "./stores/Vulnerability";

async function boot() {
    const web3 = await getWeb3();
    const account = (await web3.eth.getAccounts())[0];
    const ipfs = ipfsClient(config.IPFS_PROVIDER, '5001', { protocol: 'https' });

    const store = {
        web3,
        ipfs,
        account,
        vulnerabilities: new Vulnerabilities(),
        vulnerability: new Vulnerability(),
        router: new RouterStore(),
    }

    startRouter(views, store);

    ReactDOM.render(
        <Provider store={store}>
            <MobxRouter />
        </Provider>,
        document.getElementById('root')
    );
}
boot();
