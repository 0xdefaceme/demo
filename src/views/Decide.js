import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';

import config from "../config";

@inject("store")
@observer
class Decide extends Component {
    constructor(props) {
        super(props);

        this.onDecrypt = this.onDecrypt.bind(this);
    }

    async onDecrypt() {
        const id = this.props.store.router.params.id;
        const key = this.refs.key.value;
        const { hash } = this.props.store.vulnerability;
        const { web3, vulnerability, account } = this.props.store;
        await vulnerability.decrypt(web3, account, id, key);
    }

    async componentDidMount() {
        const id = this.props.store.router.params.id;
        const { web3 } = this.props.store;
        const account = (await web3.eth.getAccounts())[0];
        const { vulnerability } = this.props.store;
        await vulnerability.fetch(web3, account, id);
    }
    
    render() {
        const { vulnerability } = this.props.store;
        return (
            <div>
                <p>Hash: {vulnerability.hash}</p>
                <input type="text" ref="key" placeholder="key" />
                <button onClick={this.onDecrypt}>Decrypt</button>
                <p>Vulnerability: {vulnerability.decrypted}</p>
                <button onClick={this.onExit}>Exit</button>
                <button onClick={this.onRestore}>Restore</button>
            </div>
        );
    }
}

export default Decide;
