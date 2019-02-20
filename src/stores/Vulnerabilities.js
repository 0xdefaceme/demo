import {observable, flow} from 'mobx';

import ZeroDay from "../../build/contracts/ZeroDay";
import Vulnerability from "./Vulnerability";

class Vulnerabilities {
    @observable list = [];
    @observable length = 0;

    @observable state = "pending";

    async contract(web3) {
        const networkId = await web3.eth.net.getId();
        return new web3.eth.Contract(
            ZeroDay.abi, ZeroDay.networks[networkId].address
        );
    }

    filter = flow(function * (web3, account, exploitable) {
        this.list = [];
        this.state = "pending";

        const contract = yield this.contract(web3);
        let ids;
        try {
            ids = yield contract
                            .methods
                            .filter(exploitable)
                            .call({from: account});
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

    fetchAll = flow(function * (web3, account) {
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

    fetchLength = flow(function * (web3, account) {
        this.state = "pending";

        const contract = yield this.contract(web3);

        try {
            const len = yield contract.methods.length().call({from: account});
            this.length = parseInt(len, 10);

            this.state = "done";
        } catch (err) {
            console.log(err);
            this.state = "error";
        }
    });

    commit = flow(function * (web3, account, exploitable, damage) {
        this.state = "pending";

        const contract = yield this.contract(web3);

        try {
            yield contract.methods.commit(
                exploitable,
                damage
            ).send({from: account});

            this.state = "done";
        } catch(err) {
            console.log(err);
            this.state = "error";
        }
    });
}

export default Vulnerabilities;
