//@format

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

export { Button, Label };
