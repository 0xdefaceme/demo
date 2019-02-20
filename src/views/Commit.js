import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';

@inject("store")
@observer
class Commit extends Component {
    constructor(props) {
        super(props);

        this.onCommit = this.onCommit.bind(this);
    }

    async onCommit() {
        const exploitable = this.refs.exploitable.value;
        const damage = this.refs.damage.value;

        const { web3, account } = this.props.store;
        const { vulnerabilities } = this.props.store;
        await vulnerabilities.commit(web3, account, exploitable, damage);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="contract address"
                    ref="exploitable"
                />
                <input
                    type="number"
                    placeholder="damage caused by vuln"
                    ref="damage"
                />
                <button onClick={this.onCommit}>Submit</button>
            </div>
        );
    }
}

export default Commit;
