//@format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Grid, Cell } from "react-foundation";
import { createGlobalStyle } from "styled-components";
import ReactTooltip from "react-tooltip";

import Nav from "./Nav";

import config from "../config";

const GlobalStyle = createGlobalStyle`
    body, html {
      margin: 0;
      background-color: ${config.CSS.BACKGROUND_COLOR};
      background: ${config.CSS.BACKGROUND_COLOR};
    }
    table {
      margin-bottom: 0;
    }
    tbody td, thead th {
      text-align: center;
    }
`;

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <GlobalStyle />
        <ReactTooltip place="top" type="dark" effect="float" />
        <Nav />
        {children}
      </div>
    );
  }
}

export default App;
