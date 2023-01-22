import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { white } = colors;

const StyledView = styled.ScrollView`
  flex: 1;
  background-color: ${white};
  padding: 20px;
`;

export const ScrollableContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};
