import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";

const { darkGrey } = colors;

const StyledText = styled.Text`
  font-weight: 400;
  text-align: left;
  margin-top: 5px;
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${darkGrey}`)}
  ${(props) => (props.fs ? `font-size: ${props.fs}px` : `font-size: 16px`)}
`;

export const DescriptionText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
