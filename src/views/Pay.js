import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';

import getWeb3 from "../utils/getWeb3";

@inject("store")
@observer
class Pay extends Component {
    constructor(props) {
        super(props);

        this.onDeposit = this.onDeposit.bind(this);
    }

    async componentDidMount() {
        const id = this.props.store.router.queryParams.id;
        const web3 = await getWeb3();        
        const account = (await web3.eth.getAccounts())[0];
        const { vulnerability } = this.props.store;
        await vulnerability.compute(web3, account, id);
    }

    async onPay() {
        const id = this.props.store.router.queryParams.id;
        const web3 = await getWeb3();        
        const account = (await web3.eth.getAccounts())[0];
        const { vulnerability } = this.props.store;
        await vulnerability.pay(web3, account, id);
        await vulnerability.compute(web3, account, id);
    }

    render() {
        const { vulnerability } = this.props.store;
        return (
            <div>
                <p>ID: {vulnerability.id}</p>
                <p>Exploitable: {vulnerability.exploitable}</p>
                <p>Status: {vulnerability.status}</p>
                <p>Damage: {vulnerability.damage}</p>
                <p>Pay to reveal: {vulnerability.tmpbounty}</p>
                <p>Private key (store pls): {vulnerability.privateKey}</p>
                <p>Public key: {vulnerability.address}</p>
                <button onClick={this.onPay}>Pay</button>
            </div>
        );
    }
}

export default Pay;
