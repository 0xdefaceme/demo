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

export { Button };
