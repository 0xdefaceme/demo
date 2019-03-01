// @format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

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
  }

  handleValueChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <ReactMde
          onChange={this.handleValueChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
        <button onClick={this.onReveal}>Reveal</button>
      </div>
    );
  }
}

export default Reveal;
