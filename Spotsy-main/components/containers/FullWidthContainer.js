import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";
import { StatusBarHeight } from "../dimensions/dimensions";

const { white } = colors;

const FullWidthContainer = styled.View`
  flex: 1;
  paddingtop: ${StatusBarHeight + 20}px;
  background-color: ${white};
`;

export const MainContainer = (props) => {
  return <FullWidthContainer {...props}>{props.children}</FullWidthContainer>;
};
