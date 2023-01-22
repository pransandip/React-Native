import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { primary, teritary } = colors;

const StyledText = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 15px;
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${primary}`)}
`;

export const ExtraText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
