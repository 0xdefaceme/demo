// @format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Grid, Cell } from "react-foundation";
import styled from "styled-components";

import view from "../views";
import { Button, Header, Disclaimer, Form, Footer, Input } from "../components";

@inject("router", "web3", "ipfs", "account", "vulnerability")
@observer
class Reveal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "# Vulnerability description"
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });

    this.handleValueChange = this.handleValueChange.bind(this);
    this.onReveal = this.onReveal.bind(this);
  }

  async onReveal() {
    const { router, web3, ipfs, account, vulnerability } = this.props;
    const id = router.params.id;
    await vulnerability.reveal(web3, ipfs, account, id, this.state.value);
    router.goTo(views.list, null, { router });
  }

  handleValueChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <Grid>
        <Cell large={3} />
        <Cell large={6}>
          <Header>Reveal Vulnerability</Header>
          <Disclaimer>
            <p>Welcome, back!</p>
            <p>
              You're about to submit your vulnerability report. Here are a few
              tips that will make your report to succeed more likely:
            </p>
            <ul>
              <li>Make sure you give as many details as possible</li>
              <li>
                Use the tools provided by the Markdown editor e.g. code
                highlighting
              </li>
              <li>Include a calculation of your damage estimate</li>
            </ul>
            <p>Happy revealing!</p>
          </Disclaimer>
          <Form>
            <Grid>
              <Cell large={12}>Report</Cell>
            </Grid>
          </Form>
          <ReactMde
            onChange={this.handleValueChange}
            value={this.state.value}
            generateMarkdownPreview={markdown =>
              Promise.resolve(this.converter.makeHtml(markdown))
            }
          />
          <Footer>
            <Button bgColor="black" color="white" onClick={this.onReveal}>
              Reveal
            </Button>
          </Footer>
        </Cell>
        <Cell large={3} />
      </Grid>
    );
  }
}

export default Reveal;
