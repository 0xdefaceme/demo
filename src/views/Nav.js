//@format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Link } from "mobx-router";
import styled from "styled-components";
import { Grid, Cell, Menu, MenuItem, Alignments } from "react-foundation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import views from "../views";
import { Button } from "../components";

import logo from "../assets/placeholder.png";

const Header = styled.div`
  height: 10vh;
  background-color: #f9fbfd;
  margin-top: 1em;
  a {
    color: black;
    font-size: 1.1em;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logo = styled.img`
  height: 2em;
`;

@inject("store")
@observer
class Nav extends Component {
  render() {
    const { path } = this.props.store.router.currentView;
    const { goTo } = this.props.store.router;

    // Landing page menu
    if (path === "/") {
      return (
        <Header>
          <Grid className="display">
            <Cell small={0} large={2} />
            <Cell small={6} large={4} />
            <Cell small={6} large={4}>
              <Menu alignment={Alignments.RIGHT}>
                <MenuItem>
                  <a target="_blank" href="https://github.com/0xdefaceme/">
                    GitHub
                  </a>
                </MenuItem>
              </Menu>
            </Cell>
            <Cell small={0} large={2} />
          </Grid>
        </Header>
      );
    } else {
      // App menu
      return (
        <Header>
          <Grid className="display">
            <Cell small={0} large={1} />
            <Cell small={6} large={5}>
              <Menu alignment={Alignments.LEFT}>
                <MenuItem>
                  <Logo src={logo} />
                </MenuItem>
                <MenuItem>
                  <Link view={views.home} store={this.props.store}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link view={views.list} store={this.props.store}>
                    Vulnerabilities
                  </Link>
                </MenuItem>
              </Menu>
            </Cell>
            <Cell small={6} large={5}>
              <Menu alignment={Alignments.RIGHT}>
                <MenuItem>
                  <Button
                    onClick={() =>
                      goTo(views.commit, null, this.props.store)
                    }
                    bgColor="black"
                    color="white"
                  >
                    Commit Vulnerability
                  </Button>
                </MenuItem>
              </Menu>
            </Cell>
            <Cell small={0} large={1} />
          </Grid>
        </Header>
      );
    }
  }
}

export default Nav;
