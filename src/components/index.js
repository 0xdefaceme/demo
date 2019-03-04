

import styled from "styled-components";

const Button = styled.button`
  display: inline-flex;
  background-color: ${props => props.bgColor};
  border: 1px solid white;
  color: ${props => props.color};
  padding: 10px;
  border-radius: 5px;
  margin: ${props => props.margin};
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const HollowButton = styled.button`
  border-radius: 5px;
  display: inline-flex;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.div`
  text-align: center;
  padding: 0.1em;
  background-color: ${props => props.bgColor};
  //color: ${props => props.color};
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  border-radius: 5px;
`;

const HR = styled.div`
  border-top: 1px dashed ${props => props.color};
`;

// NOTE: We can currently not use this component in Nav.js as we'd then need to
// inject web3. This would make the landing page not work for users without
// Metamask
const Network = ({ network }) => (
  <div>
    {network === "mainnet" ? (
      <Label color={config.CSS.NETWORK.MAINNET}>Mainnet</Label>
    ) : null}
    {network === "rinkeby" ? (
      <Label color={config.CSS.NETWORK.RINKEBY}>Rinkeby</Label>
    ) : null}
  </div>
);

const Header = styled.div`
  font-weight: bold;
  font-size: 2em;
  background-color: #f8f8f8;
  border-top: 1px solid #eeeeee;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 5px 5px 5px 10px;
`;

const Disclaimer = styled.div`
  background-color: white;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  padding: 10px 1em 10px 1em;
  font-size: 1.2em;
  & p {
    margin-bottom: 0.1em;
  }
  & ul {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
`;

const Form = styled.div`
  & .cell {
    background-color: white;
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .cell:first-child {
    font-size: 1.2em;
    font-weight: bold;
    background-color: #f8f8f8;
    padding: 10px 0 10px 0;
  }
  & .cell:nth-child(odd) {
    border-left: none;
  }
  & .cell:nth-child(even) {
    border-right: none;
    font-weight: bold;
  }
`;

const Footer = styled.div`
  border-bottom: 1px solid #eeeeee;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  background-color: white;
  height: 3.5em;
  & ${Button}, ${HollowButton} {
    float: right;
    margin-top: 0.5em;
    margin-right: 0.5em;
  }
`;

const Input = styled.input`
  margin: 5px 0 5px 0;
  padding: 0;
  border: none;
  outline: none;
  box-shadow: inset 0px 0px 0px 0px black;
  &: hover {
    box-shadow: inset 0px 0px 0px 0px black;
  }
  &: focus {
    box-shadow: inset 0px 0px 0px 0px black;
    border: none;
  }
  & :disabled {
    background-color: white;
  }
`;

export {
  Button,
  HollowButton,
  Label,
  HR,
  Header,
  Input,
  Form,
  Disclaimer,
  Footer
};
