import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { primary } = colors;

const StyledText = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: ${primary};
  padding: 10px;
`;

export const PageTitle = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
