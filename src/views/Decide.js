//@format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Grid, Cell } from "react-foundation";
import ReactMarkdown from "react-markdown";
import { FoldingCube } from "styled-spinkit";
import styled from "styled-components";

import views from "../views";
import config from "../config";
import {
  Button,
  HollowButton,
  Header,
  Disclaimer,
  Form,
  Footer,
  Input
} from "../components";

const MarkdownWrapper = styled.div`
  padding: 10px 1em 10px 1em;
  width: 100%;
`;

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
    await vulnerability.decrypt(web3, account, id, key);
  }

  onDecide(exit) {
    return async () => {
      const { web3, vulnerability, account, router } = this.props;
      const id = router.params.id;
      const reason = this.refs.reason.value;
      await vulnerability.decide(web3, account, id, exit, reason);
      router.goTo(views.list, null, { router });
    };
  }

  async componentDidMount() {
    const { web3, vulnerability, account, router } = this.props;
    const id = router.params.id;
    await vulnerability.fetch(web3, account, id);
  }

  render() {
    const { vulnerability, web3 } = this.props;
    return (
      <Grid>
        <Cell large={3} />
        <Cell large={6}>
          <Header>Decide a Vulnerability</Header>
          <Disclaimer>
            <p>Wow!</p>
            <p>You're about to see the submitted vulnerability. Congraz!</p>
            <p>
              Make sure to take appropriate time to make your decision.{" "}
              <i>Deciding</i> is irreversable.
            </p>
          </Disclaimer>
          <Form>
            <Grid>
              <Cell large={12}>Information</Cell>
              <Cell large={4}>Contract</Cell>
              <Cell large={8}>
                <Input type="text" value={vulnerability.exploitable} disabled />
              </Cell>
              <Cell large={4}>Encrypted report</Cell>
              <Cell large={8}>
                <Input type="text" value={vulnerability.encrypted} disabled />
              </Cell>
              <Cell large={4}>Plain report</Cell>
              <Cell large={8}>
                <Input type="text" value={vulnerability.plain} disabled />
              </Cell>
              <Cell large={4}>Bounty (ETH)</Cell>
              <Cell large={8}>
                <Input
                  type="text"
                  value={web3.utils.fromWei(vulnerability.bounty, "ether")}
                  disabled
                />
              </Cell>
            </Grid>
          </Form>
          <Form>
            <Grid>
              <Cell large={12}>Decrypt</Cell>
              <Cell large={4}>Private Key</Cell>
              <Cell large={8}>
                <Input type="text" placeholder="e.g. 0x71f...ce96" ref="key" />
              </Cell>
            </Grid>
          </Form>
          <Footer>
            <HollowButton
              bgColor="white"
              color="black"
              onClick={this.onDecrypt}
            >
              Decrypt
            </HollowButton>
          </Footer>
          <Form>
            <Grid>
              <Cell large={12}>Report</Cell>
              <Cell large={12}>
                {vulnerability.decrypted ? (
                  <MarkdownWrapper>
                    <ReactMarkdown source={vulnerability.decrypted} />
                  </MarkdownWrapper>
                ) : (
                  <div>
                    <FoldingCube />
                    <p>
                      Enter your private key above to decrypt the vulnerability
                      report.
                    </p>
                  </div>
                )}
              </Cell>
            </Grid>
          </Form>
          <Form>
            <Grid>
              <Cell large={12}>Decision</Cell>
              <Cell large={4}>Reason</Cell>
              <Cell large={8}>
                <Input
                  type="text"
                  ref="reason"
                  placeholder="e.g. Damage value too high"
                />
              </Cell>
            </Grid>
          </Form>
          <Disclaimer>
            To give in to the attacker's vulnerability and shut down your
            contract press "Exit". To ignore the vulnerability or refuse it for
            some reason, press "Ignore".
          </Disclaimer>
          <Footer>
            <Button
              bgColor="black"
              color="white"
              disabled={!vulnerability.decrypted}
              onClick={this.onDecide(true)}
            >
              Exit
            </Button>
            <Button
              disabled={!vulnerability.decrypted}
              bgColor="black"
              color="white"
              onClick={this.onDecide(false)}
            >
              Ignore
            </Button>
          </Footer>
        </Cell>
        <Cell large={3} />
      </Grid>
    );
  }
}

export default Decide;
