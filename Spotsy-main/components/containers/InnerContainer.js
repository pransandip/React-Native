import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";
import { StatusBarHeight } from "../dimensions/dimensions";

const { white } = colors;

const StyledView = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const InnerContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};
