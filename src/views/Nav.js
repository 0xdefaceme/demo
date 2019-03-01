//@format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Link } from "mobx-router";
import styled from "styled-components";
import { Grid, Cell, Menu, MenuItem, Alignments } from "react-foundation";

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

@inject("router")
@observer
class Nav extends Component {
  render() {
    const { router } = this.props;
    const { currentPath, goTo } = router;

    // Landing page menu
    if (currentPath === "/") {
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
                  <Link view={views.home} store={{ router }}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link view={views.list} store={{ router }}>
                    Vulnerabilities
                  </Link>
                </MenuItem>
              </Menu>
            </Cell>
            <Cell small={6} large={5}>
              <Menu alignment={Alignments.RIGHT}>
                <MenuItem>
                  <Button
                    onClick={() => goTo(views.commit, null, { router })}
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
