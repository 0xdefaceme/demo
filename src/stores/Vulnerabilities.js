//@format
import { observable, flow } from "mobx";

import Negotiator from "../../build/contracts/Negotiator";
import Vulnerability from "./Vulnerability";
import config from "../config";

class Vulnerabilities {
  @observable
  list = [];
  @observable
  length = 0;

  @observable
  state = "pending";

  async contract(web3) {
    const networkId = await web3.eth.net.getId();
    if (Negotiator.networks[networkId]) {
      return new web3.eth.Contract(
        Negotiator.abi,
        Negotiator.networks[networkId].address
      );
    } else {
      return new web3.eth.Contract(
        Negotiator.abi,
        config.RINKEBY_TEST.NEGOTIATOR
      );
    }
  }

  filter = flow(function*(web3, account, exploitable) {
    this.list = [];
    this.state = "pending";

    const contract = yield this.contract(web3);
    let ids;
    try {
      ids = yield contract.methods.filter(exploitable).call({ from: account });
    } catch (err) {
      console.log(err);
      this.state = "error";
    }

    for (let i = 0; i < ids.length; i++) {
      try {
        const vuln = new Vulnerability();
        yield vuln.fetch(web3, account, i);
        this.list.push(vuln);
      } catch (err) {
        console.log(err);
        this.state = "error";
      }
    }
  });

  fetchAll = flow(function*(web3, account) {
    this.list = [];
    this.state = "pending";

    const contract = yield this.contract(web3);
    yield this.fetchLength(web3, account);

    for (let i = 0; i < this.length; i++) {
      try {
        const vuln = new Vulnerability();
        yield vuln.fetch(web3, account, i);
        this.list.push(vuln);
      } catch (err) {
        console.log(err);
        this.state = "error";
      }
    }
  });

  fetchLength = flow(function*(web3, account) {
    this.state = "pending";

    const contract = yield this.contract(web3);

    try {
      const len = yield contract.methods.length().call({ from: account });
      this.length = parseInt(len, 10);

      this.state = "done";
    } catch (err) {
      console.log(err);
      this.state = "error";
    }
  });

  commit = flow(function*(web3, account, exploitable) {
    this.state = "pending";

    const contract = yield this.contract(web3);

    try {
      yield contract.methods.commit(exploitable).send({ from: account });

      this.state = "done";
    } catch (err) {
      console.log(err);
      this.state = "error";
    }
  });
}

export default Vulnerabilities;
