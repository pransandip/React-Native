import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { primary } = colors;

const StyledText = styled.Text`
  font-size: 80px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${primary}`)}
`;

export const BigText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
