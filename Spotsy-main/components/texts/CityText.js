import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";

const { black } = colors;

const StyledText = styled.Text`
  font-size: 16px;
  ${(props) =>
    props.textAlign ? `text-align: ${props.textAlign}` : `text-align: left`}
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${black}`)}
  ${(props) => (props.mt ? `margin-top: ${props.mt}px` : `margin-top: 0px`)}
  ${(props) =>
    props.mb ? `margin-bottom: ${props.mb}px` : `margin-bottom: 0px`}
  ${(props) => (props.fw ? `font-weight: ${props.fw}` : `font-weight: 500`)}
  ${(props) => (props.ml ? `margin-left: ${props.ml}px` : `margin-left: 0px`)}
`;

export const CityText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
