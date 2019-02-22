import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';
import {
    Grid,
    Cell,
} from "react-foundation";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import logo from "../assets/placeholder.png";

const Wrapper = styled.div`
   height: 100vh; 
   display: flex;
   justify-content: center;
   align-items: center;
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
    h4 {
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


@inject("store")
@observer
class Home extends Component {
    render() {
        return (
            <Grid className="display">
                <Cell large={1} />
                <Cell large={10}>
                    <Wrapper>
                        <LogoWrapper>
                            <Logo src={logo}/>
                        </LogoWrapper>
                        <Headline>
                            <HeadlineWrapper>
                                <h4>Exit gracefully.</h4>
                                <p>
                                    0xdeface.me is a standard to settle
                                    Ethereum smart contracts gracefully in case
                                    of vulnerabilities.
                                </p>
                                <ButtonWrapper>
                                    <Button bgColor="black" color="white">
                                        Launch App
                                    </Button>
                                    <HollowButton>
                                        <FontAwesomeIcon
                                            icon="external-link-square-alt" />
                                        {' '}
                                        Learn more
                                    </HollowButton>
                                </ButtonWrapper>
                            </HeadlineWrapper>
                        </Headline>
                    </Wrapper>
                </Cell>
                <Cell large={1} />
            </Grid>
        );
    }
}

export default Home;
