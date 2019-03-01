//@format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Grid, Cell } from "react-foundation";
import styled from "styled-components";

import views from "../views";
import { Button, Header, Disclaimer, Form, Footer, Input } from "../components";

@inject("account", "web3", "vulnerabilities")
@observer
class Commit extends Component {
  constructor(props) {
    super(props);

    this.onCommit = this.onCommit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      balance: "N/A"
    };
  }

  async onChange() {
    const { web3 } = this.props;
    const exploitable = this.refs.exploitable.value;
    const balance = await web3.eth.getBalance(exploitable);
    this.setState({ balance: web3.utils.fromWei(balance) });
  }

  async onCommit() {
    const exploitable = this.refs.exploitable.value;
    let damage = this.refs.damage.value;

    const { router, vulnerabilities, web3, account } = this.props;
    damage = web3.utils.toWei(damage, "ether");
    await vulnerabilities.commit(web3, account, exploitable, damage);
    router.goTo(views.list, null, { router });
  }

  render() {
    const { account } = this.props;
    const { balance } = this.state;
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
            </p>
            <ul>
              <li>
                "Damage" will be used by the Negotiator to calculate your
                bounty. Contract owners will decline your vulnerability when you
                sent an incorrect "damage" estimate! So make sure to set it
                correctly. Remember, that when you later <i>reveal</i> your
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
                  onChange={this.onChange}
                />
              </Cell>
              <Cell large={4}>Contract Balance (ETH)</Cell>
              <Cell large={8}>
                <Input type="text" value={balance} disabled />
              </Cell>
              <Cell large={4}>Estimated Damage (ETH)</Cell>
              <Cell large={8}>
                <Input type="number" placeholder="e.g. 12.1234" ref="damage" />
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
