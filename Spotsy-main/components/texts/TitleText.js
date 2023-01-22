import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { primary, black } = colors;

const StyledText = styled.Text`
  font-weight: 500;
  ${(props) => (props.fs ? `font-size: ${props.fs}px` : `font-size: 25px`)}
  ${(props) => (props.mt ? `margin-top: ${props.mt}px` : `margin-top: 10px`)}
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${black}`)}
`;

export const TitleText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
