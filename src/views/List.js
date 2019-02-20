import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';
import {Link} from 'mobx-router';

import views from "../views";

@inject("store")
@observer
class VulnerabilityList extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onFilter = this.onFilter.bind(this);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.filter !== this.state.filter) {
            const filter = this.state.filter;
            const { router: { goTo } } = this.props.store;
            goTo(views.list, null, this.props.store, filter);
            this.load();
        }
    }

    async componentDidMount() {
        const exploitable = this.props.store.router.queryParams.exploitable;
        this.setState({
            filter: {
                exploitable
            }
        });
    }

    async load() {
        const { web3 } = this.props.store;
        const account = (await web3.eth.getAccounts())[0];
        const exploitable = this.props.store.router.queryParams.exploitable;
        const { vulnerabilities } = this.props.store;
        await vulnerabilities.filter(web3, account, exploitable);
    }

    onFilter() {
        const { web3 } = this.props.store;
        const exploitable = this.refs.filter.value;
        if (exploitable && web3.utils.isAddress(exploitable)) {
            this.setState({
                filter: {
                    exploitable
                }
            })
        } else {
            this.setState({ filter: {} });
        }
    }

    render() {
        const { vulnerabilities: { list } } = this.props.store;
        return (
            <div>
                <h1>List of Vulnerabilities</h1>
                <p>
                    <input
                        type="text"
                        ref="filter"
                        onChange={this.onFilter}
                        defaultValue={this.state.filter && this.state.filter.exploitable}
                        placeholder="filter by contract"
                    />
                </p>
                <Link view={views.commit} store={this.props.store}>Commit</Link>
                {list.map((vuln, i) => (
                    <div key={i}>
                        <span>{vuln.id}</span>
                        <span>{vuln.exploitable}</span>
                        <span>{vuln.hunter}</span>
                        <Link
                            view={views.pay}
                            queryParams={{
                                id: vuln.id
                            }}
                            store={this.props.store}>
                            Pay
                        </Link>
                        <Link
                            view={views.reveal}
                            queryParams={{
                                id: vuln.id
                            }}
                            store={this.props.store}>
                            Reveal
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default VulnerabilityList;
