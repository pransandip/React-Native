import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { red, secondary } = colors;

const StyledText = styled.Text`
  text-align: center;
  font-size: 13px;
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${secondary}`)}
`;

export const MsgBox = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
