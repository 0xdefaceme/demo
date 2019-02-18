import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';
import {Link} from 'mobx-router';

import getWeb3 from "../utils/getWeb3";
import views from "../views";

@inject("store")
@observer
class VulnerabilityList extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const exploitable = this.props.store.router.queryParams.exploitable;
        const web3 = await getWeb3();        
        const account = (await web3.eth.getAccounts())[0];
        const { vulnerabilities } = this.props.store;
        await vulnerabilities.filter(web3, account, exploitable);
    }

    render() {
        const { vulnerabilities: { list } } = this.props.store;
        return (
            <div>
                <h1>List of Vulnerabilities</h1>
                <Link view={views.commit} store={this.props.store}>Commit</Link>
                {list.map((vuln, i) => (
                    <div key={i}>
                        <span>{vuln.id}</span>
                        <span>{vuln.exploitable}</span>
                        <span>{vuln.hunter}</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default VulnerabilityList;
