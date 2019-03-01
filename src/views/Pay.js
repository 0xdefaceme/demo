// @format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";

@inject("router", "web3", "account", "vulnerability")
@observer
class Pay extends Component {
  constructor(props) {
    super(props);

    this.onPay = this.onPay.bind(this);
  }

  async componentDidMount() {
    const { router, web3, account, vulnerability } = this.props;
    const id = router.params.id;
    await vulnerability.compute(web3, account, id);
  }

  async onPay() {
    const { router, web3, account, vulnerability } = this.props;
    const id = router.params.id;
    await vulnerability.pay(web3, account, id);
    await vulnerability.compute(web3, account, id);
  }

  render() {
    const { vulnerability } = this.props;
    return (
      <div>
        <p>Only possible as owner of the contract.</p>
        <p>ID: {vulnerability.id}</p>
        <p>Exploitable: {vulnerability.exploitable}</p>
        <p>Status: {vulnerability.status}</p>
        <p>Damage: {vulnerability.damage}</p>
        <p>Pay to reveal: {vulnerability.tmpbounty}</p>
        <p>Private key (store pls): {vulnerability.privateKey}</p>
        <p>Public key: {vulnerability.publicKey}</p>
        <button onClick={this.onPay}>Pay</button>
      </div>
    );
  }
}

export default Pay;
