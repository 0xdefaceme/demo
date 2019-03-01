//@format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";

import views from "../views";
import config from "../config";

@inject("router", "web3", "account", "vulnerability")
@observer
class Decide extends Component {
  constructor(props) {
    super(props);

    this.onDecrypt = this.onDecrypt.bind(this);
  }

  async onDecrypt() {
    const { web3, vulnerability, account, router } = this.props;
    const id = router.params.id;
    const key = this.refs.key.value;
    const { hash } = vulnerability;
    await vulnerability.decrypt(web3, account, id, key);
  }

  onDecide(exit) {
    return async () => {
      const { web3, vulnerability, account, router } = this.props;
      const id = router.params.id;
      await vulnerability.decide(web3, account, id, exit);
      router.goTo(views.list, null, { router });
    };
  }

  async componentDidMount() {
    const { web3, vulnerability, account, router } = this.props;
    const id = router.params.id;
    await vulnerability.fetch(web3, account, id);
  }

  render() {
    const { vulnerability } = this.props;
    return (
      <div>
        <p>Hash: {vulnerability.hash}</p>
        <input type="text" ref="key" placeholder="key" />
        <button onClick={this.onDecrypt}>Decrypt</button>
        <p>Vulnerability: {vulnerability.decrypted}</p>
        <button onClick={this.onDecide(true)}>Exit</button>
        <button onClick={this.onDecide(false)}>Restore</button>
      </div>
    );
  }
}

export default Decide;
