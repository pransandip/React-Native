import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { primary } = colors;

const StyledText = styled.Text`
  font-size: 15px;
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${primary}`)}
`;

export const TextLinkContent = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
