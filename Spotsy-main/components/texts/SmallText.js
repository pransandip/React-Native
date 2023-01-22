import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { secondary } = colors;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${secondary}`)}
`;

export const SmallText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
