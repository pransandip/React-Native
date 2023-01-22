import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { primary } = colors;

const StyledLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLink = (props) => {
  return <StyledLink {...props}>{props.children}</StyledLink>;
};
