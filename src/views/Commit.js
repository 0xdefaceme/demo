//@format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Grid, Cell } from "react-foundation";
import styled from "styled-components";

import { Button } from "../components";

const Header = styled.div`
  font-weight: bold;
  font-size: 2em;
  background-color: #f8f8f8;
  border-top: 1px solid #eeeeee;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 5px 5px 5px 10px;
`;

const Disclaimer = styled.div`
  background-color: white;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  padding: 10px 1em 10px 1em;
  font-size: 1.2em;
  & p {
    margin-bottom: 0.1em;
  }
  & ul {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
`;

const Form = styled.div`
  & .cell {
    background-color: white;
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .cell:first-child {
    font-size: 1.2em;
    font-weight: bold;
    background-color: #f8f8f8;
    padding: 10px 0 10px 0;
  }
  & .cell:nth-child(odd) {
    border-left: none;
  }
  & .cell:nth-child(even) {
    border-right: none;
    font-weight: bold;
  }
`;

const Footer = styled.div`
  border-bottom: 1px solid #eeeeee;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  background-color: white;
  margin-bottom: 2em;
  height: 3em;
  & ${Button} {
    float: right;
    margin-right: 0.5em;
  }
`;

const Input = styled.input`
  margin: 5px 0 5px 0;
  padding: 0;
  border: none;
  outline: none;
  box-shadow: inset 0px 0px 0px 0px black;
  &: hover {
    box-shadow: inset 0px 0px 0px 0px black;
  }
  &: focus {
    box-shadow: inset 0px 0px 0px 0px black;
    border: none;
  }
  & :disabled {
    background-color: white;
  }
`;

@inject("store")
@observer
class Commit extends Component {
  constructor(props) {
    super(props);

    this.onCommit = this.onCommit.bind(this);
  }

  async onCommit() {
    const exploitable = this.refs.exploitable.value;
    let damage = this.refs.damage.value;

    const { web3, account } = this.props.store;
    const { vulnerabilities } = this.props.store;
    damage = web3.utils.toWei(damage, "ether");
    await vulnerabilities.commit(web3, account, exploitable, damage);
  }

  render() {
    const { account } = this.props.store;
    return (
      <Grid>
        <Cell large={3} />
        <Cell large={6}>
          <Header>Commit a Vulnerability</Header>
          <Disclaimer>
            <p>Hello 👋</p>
            <p>
              You're about to <i>commit</i> a vulnerability! That's exciting!
              There's, however, a couple of things we'd like you to know before
              doing so.
            </p>
            <p>
              <b>First of all</b>, 0xdeface.me is currently in its{" "}
              <i>early alpha</i>. That means things might not work as expected.
              Now that we got that off our chests, here's some tips when
              committing vulnerabilities:
              <ul>
                <li>
                  "Damage" will be used by the Negotiator to calculate your
                  bounty. Contract owners will decline your vulnerability when
                  you sent an incorrect "damage" estimate! So make sure to set
                  it correctly. Remember, that when you later <i>reveal</i> your
                  vulnerability report to give a little calculation on how you
                  arrived at the damage estimate.
                </li>
                <li>
                  Only contracts implementing EIP-XXX correctly will be
                  committable.
                </li>
                <li>
                  We will store your email confidentially. We require an email
                  address as we'd like to send you updates on the status of your
                  vulnerability. Especially, when it's time for you to{" "}
                  <i>reveal</i>. We'll not share your email with the contract
                  owner.
                </li>
              </ul>
              <p>And that's it. Happy committing!</p>
            </p>
          </Disclaimer>
          <Form>
            <Grid>
              <Cell large={12}>Form</Cell>
              <Cell large={4}>Contract</Cell>
              <Cell large={8}>
                <Input
                  type="text"
                  placeholder="e.g. 0x9575eb2a7804c43f68dc79..."
                  ref="exploitable"
                />
              </Cell>
              <Cell large={4}>Damage (ETH)</Cell>
              <Cell large={8}>
                <Input type="number" placeholder="e.g. 1.1234" ref="damage" />
              </Cell>
              <Cell large={4}>Your Address</Cell>
              <Cell large={8}>
                <Input type="text" value={account} disabled />
              </Cell>
            </Grid>
            <Footer large={12}>
              <Button bgColor="black" color="white" onClick={this.onCommit}>
                Commit
              </Button>
            </Footer>
          </Form>
        </Cell>
        <Cell large={3} />
      </Grid>
    );
  }
}

export default Commit;
