import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";

const { black } = colors;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-top: 5px;
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${black}`)}
`;

export const PriceText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
