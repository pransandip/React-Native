import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { white } = colors;

const StyledView = styled.View`
  flex: 1;
  background-color: ${white};
`;

export const MainContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};
