import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";
const { secondary, white, primary } = colors;

const StyledTextInput = styled.TextInput`
  background-color: ${white};
  border: 1px solid ${primary};

  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  ${(props) => (props.height ? `height: ${props.height}` : `height:60px`)}
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${primary};
`;

export const TextInput = (props) => {
  return <StyledTextInput {...props}>{props.children}</StyledTextInput>;
};
