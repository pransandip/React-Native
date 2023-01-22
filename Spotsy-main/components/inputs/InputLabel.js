import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";
const { primary } = colors;

const StyledInputLabel = styled.Text`
  color: ${primary};
  font-size: 13px;
  text-align: left;
`;

export const InputLabel = (props) => {
  return <StyledInputLabel {...props}>{props.children}</StyledInputLabel>;
};
