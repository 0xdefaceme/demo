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
    width: 280px; 
    display: block;
    margin-left: auto;
    margin-right: auto;
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

const Button = styled.button`
    display: inline-flex;
    background-color: ${props => props.bgColor};
    border: 1px solid white;
    color: ${props => props.color};
    padding: 10px;
    &:hover {
        cursor: pointer;
    }
`

const HollowButton = styled.button`
    display: inline-flex;
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
    font-family: 'Noto Sans', sans-serif;
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
                            <MenuItem>
                                <a 
                                    target="_blank"
                                    href="https://github.com/0xdefaceme/" >
                                    GitHub
                                </a>
                            </MenuItem>
                        </Menu>
                    </Header>
                    <Wrapper minHeight="80vh">
                        <Grid className="display">
                            <Cell small={12} large={6}>
                                <Logo src={logo}/>
                            </Cell>
                            <Cell small={12} large={6}>
                                <Headline>
                                    <HeadlineWrapper>
                                        <h1>Exit fairly.</h1>
                                        <p>
                                            0xdeface.me is a standard to settle
                                            Ethereum smart contracts fairly in case
                                            of vulnerabilities.
                                        </p>
                                        <ButtonWrapper>
                                            <a 
                                                target="_blank"
                                                href="https://github.com/0xdefaceme/whitepaper">
                                                
                                                <Button
                                                    bgColor="black"
                                                    color="white">
                                                    <FontAwesomeIcon
                                                        icon="external-link-square-alt" />
                                                    Read the Whitepaper
                                                </Button>
                                            </a>
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
                            A secure protocol for contract owners to act on
                            vulnerabilities and legal way for auditors to earn
                            Ether by disclosing vulnerabilities.
                        </p>
                        <p>
                            0xdeface a.k.a.{' '}
                            <a target="_blank" href="#">EIP-XXXX</a> is a
                            standard to settle deployed smart contracts
                            fairly in favor of users and developers.
                            Auditors confidentially submit disclosures to
                            0xdeface.me. Contract owners review disclosures.
                            Do auditor and contract owner agree that a serious
                            vulnerability has been found, a contract can be
                            settled fairly by returning its users' funds.
                            Auditors get rewarded with a bounty held in
                            escrow by 0xdeface's{' '}
                            <a 
                                target="_blank"
                                href="https://github.com/0xdefaceme/demo/blob/master/contracts/Negotiator.sol">
                                Negotiator
                            </a>.
                        </p>
                        <HR/>
                        <Grid className="display">
                            <Cell large={4}>
                                <Bullet>
                                    <Pic>⛓</Pic>
                                    <div>
                                        <p><b>Permissionless</b></p>
                                        0xdeface's{' '}
                                        <a 
                                            target="_blank"
                                            href="https://github.com/0xdefaceme/demo/blob/master/contracts/Negotiator.sol">
                                            Negotiator
                                        </a>
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
                    <Content color="black" height="auto">
                        <h1>Funding</h1>
                        <p>
                            0xdeface is being build by{' '}
                            <a 
                                target="_blank"
                                href="https://twitter.com/TimDaub">
                                Tim Daubenschütz
                            </a> and {' '}
                            <a 
                                target="_blank"
                                href="https://twitter.com/vrde">
                                Alberto Granzotto
                            </a>.
                            Check out our{' '}
                            <a 
                                target="_blank"
                                href="https://github.com/0xdefaceme/whitepaper">
                                whitepaper
                            </a>.{' '}
                            0xdeface is actively looking for funding in form of
                            grants.  For inquiries contact:{' '} 
                            <a
                                href="mailto:tim@0xdeface.me">
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
