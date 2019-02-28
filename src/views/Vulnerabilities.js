// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Link } from "mobx-router";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Grid, Cell } from "react-foundation";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import views from "../views";
import config from "../config";
import {
  shortenAddress,
  shortenBalance,
  statusToLabel
} from "../utils/helpers";

const TableH1 = styled.h1`
  font-weight: bold;
  font-size: 1.35em;
  padding-top: 10px;
  padding-left: 20px;
`;

const TableWrapper = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 5px;
  background-color: white;
`;

const Input = styled.input`
  margin-bottom: 0;
  // I'm sorry
  margin-top: 5px;
  float: right;
  width: 60%;
  border: none;
  outline: none;
  box-shadow: inset 0px 0px 0px 0px black;
  &:focus {
    border: none;
    outline: none;
    box-shadow: inset 0px 0px 0px 0px black;
  }
`;

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
      const {
        router: { goTo }
      } = this.props.store;
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
    if (exploitable) {
      await vulnerabilities.filter(web3, account, exploitable);
    } else {
      await vulnerabilities.fetchAll(web3, account);
    }
  }

  onFilter() {
    const { web3 } = this.props.store;
    const exploitable = this.refs.filter.value;
    if (exploitable && web3.utils.isAddress(exploitable)) {
      this.setState({
        filter: {
          exploitable
        }
      });
    } else {
      this.setState({ filter: {} });
    }
  }

  render() {
    const {
      vulnerabilities: { list },
      web3
    } = this.props.store;

    return (
      <div>
        <Grid>
          <Cell large={1} />
          <Cell large={10}>
            <TableWrapper>
              <Grid className="display">
                <Cell large={6}>
                  <TableH1>List of Vulnerabilities</TableH1>
                </Cell>
                <Cell large={6}>
                  <Input
                    type="text"
                    ref="filter"
                    onChange={this.onFilter}
                    defaultValue={
                      this.state.filter && this.state.filter.exploitable
                    }
                    placeholder="filter by contract address"
                  />
                </Cell>
              </Grid>
              <Table>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Contract</Th>
                    <Th>Attacker</Th>
                    <Th>Balance (ETH)</Th>
                    <Th>Damage (ETH)</Th>
                    <Th>Bounty (ETH)</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list.map((vuln, i) => (
                    <Tr key={i}>
                      <Td>{vuln.id}</Td>
                      <Td>
                        <a
                          data-tip={vuln.exploitable}
                          target="_blank"
                          href={
                            "https://etherscan.io/address/" + vuln.exploitable
                          }
                        >
                          {shortenAddress(vuln.exploitable)}
                        </a>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                      </Td>
                      <Td>
                        <a
                          data-tip={vuln.attacker}
                          target="_blank"
                          href={"https://etherscan.io/address/" + vuln.attacker}
                        >
                          {shortenAddress(vuln.attacker)}
                        </a>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                      </Td>
                      <Td>
                        <span data-tip={web3.utils.fromWei(vuln.balance)}>
                          {shortenBalance(web3.utils.fromWei(vuln.balance))}
                        </span>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                      </Td>
                      <Td>
                        <span data-tip={web3.utils.fromWei(vuln.damage)}>
                          {shortenBalance(web3.utils.fromWei(vuln.damage))}
                        </span>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                      </Td>
                      <Td>
                        <span data-tip={web3.utils.fromWei(vuln.bounty)}>
                          {shortenBalance(web3.utils.fromWei(vuln.bounty))}
                        </span>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                      </Td>
                      <Td>{statusToLabel(vuln.status)}</Td>
                      <Td>
                        <Link
                          view={views.view}
                          params={{
                            id: vuln.id.toString()
                          }}
                          store={this.props.store}
                        >
                          View
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>
            Use these addresses for testing on Rinkeby. Negotiator:{" "}
            {config.RINKEBY_TEST.NEGOTIATOR} Exploitable:{" "}
            {config.RINKEBY_TEST.EXPLOITABLE}
          </Cell>
          <Cell large={1} />
        </Grid>
      </div>
    );
  }
}

export default VulnerabilityList;
