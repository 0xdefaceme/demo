// @format
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer, inject } from "mobx-react";
import { Grid, Cell, Menu, MenuItem, Alignments } from "react-foundation";
import styled from "styled-components";
import { Link } from "mobx-router";
import ReactTooltip from "react-tooltip";

import views from "../views";
import config from "../config";

import Nav from "./Nav";
import { Button, HollowButton, HR } from "../components";

import logo from "../assets/placeholder.png";

const Wrapper = styled.div`
  height: auto;
  min-height: ${props => props.minHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4em;
`;

const Content = styled.div`
  height: ${props => props.height};
  padding-bottom: 4em;
  h1 {
    margin-top: 1.5em;
    font-weight: bold;
    font-size: 2.25em;
  }
  p {
    font-size: 1.1em;
  }
  a {
    text-decoration: underline;
    color: ${props => props.color};
  }
  @media (max-width: 768px) {
    padding-left: 1em;
    padding-right: 1em;
  }
`;

const Logo = styled.img`
  vertical-align: middle;
  width: 200px;
  display: block;
`;

const Headline = styled.div`
  h1 {
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 0;
  }
  p {
    font-size: 1.4em;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const HeadlineWrapper = styled.div`
  @media (min-width: 768px) {
    width: 400px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin-right: 20px;
  }
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Background = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`;

const Bullet = styled.div`
  margin-top: 1.5em;
  text-align: center;
`;

const Pic = styled.span`
  font-size: 3em;
`;

const Section = props => (
  <Background bgColor={props.bgColor} color={props.color}>
    <Grid className="display">
      <Cell large={props.content ? 3 : 2} />
      <Cell large={props.content ? 6 : 8}>{props.children}</Cell>
      <Cell large={props.content ? 3 : 2} />
    </Grid>
  </Background>
);

const VideoWrapper = styled.div`
  text-align: center;
`;

@inject("router")
@observer
class Home extends Component {
  render() {
    const {
      router: { goTo }
    } = this.props;
    const { router } = this.props;
    return (
      <div>
        <Section bgColor={config.CSS.BACKGROUND_COLOR} color="black">
          <Wrapper minHeight="80vh">
            <Grid className="display">
              <Cell small={12} large={6}>
                <Logo src={logo} />
              </Cell>
              <Cell small={12} large={6}>
                <Headline>
                  <HeadlineWrapper>
                    <h1>Exit fairly.</h1>
                    <p>
                      0xdeface.me is a standard to settle Ethereum smart
                      contracts fairly in case of vulnerabilities.
                    </p>
                    <ButtonWrapper>
                      <a
                        target="_blank"
                        href="https://github.com/0xdefaceme/whitepaper"
                      >
                        <Button bgColor="black" color="white">
                          Read the Whitepaper
                        </Button>
                      </a>
                      <Link view={views.list} store={{ router }}>
                        <HollowButton
                          data-tip="Metamask required!"
                          bgColor="white"
                          color="black"
                        >
                          Test the demo
                        </HollowButton>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                      </Link>
                    </ButtonWrapper>
                  </HeadlineWrapper>
                </Headline>
              </Cell>
            </Grid>
          </Wrapper>
          <Wrapper minHeight="10vh" />
        </Section>
        <Section content bgColor="black" color="white">
          <Content color="white" height="auto">
            <h1>What's 0xdeface?</h1>
            <p>
              A secure protocol for contract owners to act on vulnerabilities
              and legal way for attackers to earn Ether by disclosing
              vulnerabilities.
            </p>
            <p>
              0xdeface a.k.a.{" "}
              <a target="_blank" href="#">
                EIP-XXXX
              </a>{" "}
              is a standard to settle deployed smart contracts fairly in favor
              of users and developers. Auditors confidentially submit
              disclosures to 0xdeface.me. Contract owners review disclosures. Do
              attackers and contract owner agree that a serious vulnerability
              has been found, a contract can be settled fairly by returning its
              users' funds. Auditors get rewarded with a bounty held in escrow
              by 0xdeface's{" "}
              <a
                target="_blank"
                href="https://github.com/0xdefaceme/demo/blob/master/contracts/Negotiator.sol"
              >
                Negotiator
              </a>
              .
            </p>
            <HR />
            <Grid className="display">
              <Cell large={4}>
                <Bullet>
                  <Pic>⛓</Pic>
                  <div>
                    <p>
                      <b>Permissionless</b>
                    </p>
                    0xdeface's{" "}
                    <a
                      target="_blank"
                      href="https://github.com/0xdefaceme/demo/blob/master/contracts/Negotiator.sol"
                    >
                      Negotiator
                    </a>{" "}
                    doesn't have an owner. It implements an incentive game of
                    attackers and contract owners. Owners are in full control of
                    their contracts.
                  </div>
                </Bullet>
              </Cell>
              <Cell large={4}>
                <Bullet>
                  <Pic>💸</Pic>
                  <div>
                    <p>
                      <b>Fair</b>
                    </p>
                    User's don't lose their funds, developers don't lose their
                    cred and attackers get rewarded fairly in Ether.
                  </div>
                </Bullet>
              </Cell>
              <Cell large={4}>
                <Bullet>
                  <Pic>📄</Pic>
                  <div>
                    <p>
                      <b>Canonical</b>
                    </p>
                    0xdeface.me is building the{" "}
                    <a target="_blank" href="#">
                      EIP-XXXX
                    </a>{" "}
                    standard. Developers are invited to implement its interface.
                    Only then are attackers allowed to submit vulnerabilities.
                  </div>
                </Bullet>
              </Cell>
            </Grid>
          </Content>
        </Section>
        <Section content bgColor={config.CSS.BACKGROUND_COLOR} color="black">
          <Content color="black" height="auto">
            <h1>Videos</h1>
            <p>
              Tim gave a lightning talk introducing 0xdeface.me at EthCC 2019 in
              Paris. It's only 4 mins. Check it out!
            </p>
            <VideoWrapper>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/BvHzk1bojdg"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </VideoWrapper>
            <h1>Funding</h1>
            <p>
              0xdeface is being build by{" "}
              <a target="_blank" href="https://twitter.com/TimDaub">
                Tim Daubenschütz
              </a>{" "}
              and{" "}
              <a target="_blank" href="https://twitter.com/vrde">
                Alberto Granzotto
              </a>
              . Check out our{" "}
              <a
                target="_blank"
                href="https://github.com/0xdefaceme/whitepaper"
              >
                whitepaper
              </a>
              . 0xdeface is actively looking for funding in form of grants. For
              inquiries contact:{" "}
              <a href="mailto:tim@0xdeface.me">tim@0xdeface.me</a>
            </p>
            <HR />
            <h1>Contribute</h1>
            <p>
              Currently, the standard and marketplace are in very early stages
              of development. If you'd like to contribute anyways, email{" "}
              <a href="mailto:tim@0xdeface.me">tim@0xdeface.me</a>.
            </p>
          </Content>
        </Section>
        <Section content bgColor="black" color="white">
          <Content center color="white" height="10vh" />
        </Section>
      </div>
    );
  }
}

export default Home;
