// @format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Grid, Cell } from "react-foundation";
import styled from "styled-components";

import views from "../views";
import { Button, Header, Disclaimer, Form, Footer, Input } from "../components";

const PrivateKeyWrapper = styled.div`
  text-align: center;
  & h1 {
    font-size: 1.2em;
    font-weight: bold;
    background-color: #f8f8f8;
    padding: 10px 0 10px 0;
    margin-bottom: 0;
  }
  & p {
    text-align: left;
    background-color: white;
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    padding: 10px 1em 10px 1em;
    font-size: 1.2em;
    margin: 0;
  }
`;

const PrivateKey = styled.div`
  background-color: white;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  padding: 10px 0 10px 0;
  font-size: 1.2em;
`;

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
    router.goTo(views.list, null, { router });
  }

  render() {
    const { vulnerability, web3 } = this.props;
    return (
      <Grid>
        <Cell large={3} />
        <Cell large={6}>
          <Header>Pay for a Vulnerability</Header>
          <Disclaimer>Only possible as a contract owner.</Disclaimer>
          <Form>
            <Grid>
              <Cell large={12}>Form</Cell>
              <Cell large={4}>Vulnerability ID</Cell>
              <Cell large={8}>
                <Input type="text" value={vulnerability.id} disabled />
              </Cell>
              <Cell large={4}>Contract</Cell>
              <Cell large={8}>
                <Input type="text" value={vulnerability.exploitable} disabled />
              </Cell>
              <Cell large={4}>Damage (ETH)</Cell>
              <Cell large={8}>
                <Input
                  type="text"
                  value={web3.utils.fromWei(vulnerability.damage)}
                  disabled
                />
              </Cell>
              <Cell large={4}>Bounty to pay(ETH)</Cell>
              <Cell large={8}>
                <Input
                  type="text"
                  value={web3.utils.fromWei(vulnerability.tmpbounty)}
                  disabled
                />
              </Cell>
            </Grid>
          </Form>
          <PrivateKeyWrapper>
            <h1>Private Key</h1>
            <p>
              This is your privat key. You'll need it later to <i>decrypt</i>{" "}
              the attacker's vulnerability report.{" "}
              <b>Please store it somewhere safe!</b>
            </p>
            <PrivateKey>{vulnerability.privateKey}</PrivateKey>
          </PrivateKeyWrapper>
          <Footer>
            <Button bgColor="black" color="white" onClick={this.onPay}>
              Pay
            </Button>
          </Footer>
        </Cell>
        <Cell large={3} />
      </Grid>
    );
  }
}

export default Pay;
