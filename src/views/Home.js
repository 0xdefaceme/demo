import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';
import {
    Grid,
    Cell,
    Menu,
    MenuItem,
    Alignments
} from "react-foundation";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import views from "../views";

import logo from "../assets/placeholder.png";

const Wrapper = styled.div`
    height: ${props => props.height};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    height: ${props => props.height};
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
`;

const LogoWrapper = styled.div`
    width: 50%; 
`;

const Logo = styled.img`
    vertical-align: middle;
    height: 70%;
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

const Headline = styled.div`
    font-family: 'Noto Sans', sans-serif;
    width: 50%;
    h1 {
        font-size: 3em;
        font-weight: bold;
        margin-bottom: 0;
    }
    p {
        font-size: 1.4em;
    }
`;

const HeadlineWrapper = styled.div`
    width: 400px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    button {
        margin-right: 20px;
    }
`;

const Button = styled.button`
    background-color: ${props => props.bgColor};
    border: 1px solid white;
    color: ${props => props.color};
    padding: 10px;
    &:hover {
        cursor: pointer;
    }
`

const HollowButton = styled.button`
    background-color: ${props => props.bgColor};
    color: ${props => props.color};
    border: 1px solid ${props => props.color};
    padding: 10px;
    &:hover {
        cursor: pointer;
    }
`

const Header = styled.div`
    height: 10vh;
    margin-top: 1em;    
    a {
        color: black;
        font-size: 1.1em;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const Background = styled.div`
    background-color: ${props => props.bgColor};
    color: ${props => props.color};
`;

const HR = styled.div`
    border-top: 1px dashed ${props => props.color};
`

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
            <Cell large={props.content ? 6 : 8}>
                {props.children}
            </Cell>
            <Cell large={props.content ? 3 : 2} />
        </Grid>
    </Background>
);

@inject("store")
@observer
class Home extends Component {
    render() {
        const { router: { goTo } } = this.props.store;
        const { store } = this.props;
        return (
            <div>
                <Section bgColor="white" color="black">
                    <Header>
                        <Menu alignment={Alignments.RIGHT}>
                            <MenuItem><a>About</a></MenuItem>
                            <MenuItem><a>FAQ</a></MenuItem>
                            <MenuItem><a>Whitepaper</a></MenuItem>
                            <MenuItem><a>Github</a></MenuItem>
                        </Menu>
                    </Header>
                    <Wrapper height="70vh">
                        <LogoWrapper>
                            <Logo src={logo}/>
                        </LogoWrapper>
                        <Headline>
                            <HeadlineWrapper>
                                <h1>Exit gracefully.</h1>
                                <p>
                                    0xdeface.me is a standard to settle
                                    Ethereum smart contracts gracefully in case
                                    of vulnerabilities.
                                </p>
                                <ButtonWrapper disabled>
                                    <Button
                                        bgColor="black"
                                        color="white"
                                        onClick={() => goTo(views.list, {}, store)}>
                                        Launch App
                                    </Button>
                                    <HollowButton disabled>
                                        <FontAwesomeIcon
                                            icon="external-link-square-alt" />
                                        {' '}
                                        Learn more
                                    </HollowButton>
                                </ButtonWrapper>
                            </HeadlineWrapper>
                        </Headline>
                    </Wrapper>
                    <Wrapper height="20vh">

                    </Wrapper>
                </Section>
                <Section content bgColor="black" color="white">
                    <Content color="white" height="85vh">
                        <h1>What's 0xdeface?</h1>
                        <p>
                            A secure protocol for contract owners to act on
                            vulnerabilities and legal way for auditors to earn
                            Ether by disclosing vulnerabilities.
                        </p>
                        <p>
                            0xdeface a.k.a.{' '}
                            <a target="_blank" href="#">EIP-XXXX</a> is a
                            standard to settle deployed smart contracts
                            gracefully in favor of users and developers.
                            Auditors confidentially submit disclosures to
                            0xdeface.me. Contract owners review disclosures.
                            Do auditor and contract owner agree that a serious
                            vulnerability has been found, a contract can be
                            settled gracefully by returning its users' funds.
                            Auditors get rewarded with a bounty held in
                            escrow by 0xdeface's{' '}
                            <a target="_blank" href="#">Negotiator</a>.
                        </p>
                        <HR/>
                        <Grid className="display">
                            <Cell large={4}>
                                <Bullet>
                                    <Pic>⛓</Pic>
                                    <div>
                                        <p><b>Permissionless</b></p>
                                        0xdeface's{' '}
                                        <a target="_blank" href="#">Negotiator</a>
                                        {' '} doesn't have an owner. It
                                        implements an incentive game of
                                        auditors and contract owners.
                                        Owners are in full control of their
                                        contracts.
                                    </div>
                                </Bullet>
                            </Cell>
                            <Cell large={4}>
                                <Bullet>
                                    <Pic>💸</Pic>
                                    <div>
                                        <p><b>Fair</b></p>
                                        User's don't lose their funds,
                                        developers don't lose their cred
                                        and auditors get rewarded fairly in
                                        Ether.
                                    </div>
                                </Bullet>
                            </Cell>
                            <Cell large={4}>
                                <Bullet>
                                    <Pic>📄</Pic>
                                    <div>
                                        <p><b>Canonical</b></p>
                                        0xdeface.me is building the{' '}
                                        <a target="_blank" href="#">EIP-XXXX</a>
                                        {' '} standard. Developers are invited
                                        to implement its interface. Only then
                                        are auditors allowed to submit 
                                        vulnerabilities.
                                    </div>
                                </Bullet>
                            </Cell>
                        </Grid>
                    </Content>
                </Section>
                <Section content bgColor="white" color="black">
                    <Content color="black" height="60vh">
                        <h1>Funding</h1>
                        <p>
                            0xdeface is being build by{' '}
                            <a 
                                target="_blank"
                                href="https://twitter.com/TimDaub">
                                Tim Daubenschütz
                            </a>. It's planned to add a small negotiation
                            fee into 0xdeface's Negotiator contract for
                            continued maintenance and development. 0xdeface is
                            actively looking for funding in form of grants.
                            For inquiries contact:{' '}
                            <a href="mailto:tim@0xdeface.me">
                                tim@0xdeface.me
                            </a>
                        </p>
                        <HR/>
                        <h1>Contribute</h1>
                        <p>
                            Currently, the standard and marketplace are in very
                            early stages of development. If you'd like to
                            contribute anyways, email{' '}
                            <a href="mailto:tim@0xdeface.me">
                                tim@0xdeface.me
                            </a>.
                        </p>
                    </Content>
                </Section>
                <Section content bgColor="black" color="white">
                    <Content center color="white" height="10vh">
                    </Content>
                </Section>
            </div>
        );
    }
}

export default Home;
