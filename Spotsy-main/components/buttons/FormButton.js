import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";

const { primary, green } = colors;

const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${primary};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
  align-items: center;
  ${(props) =>
    props.backgroundColor
      ? `background-color: ${props.backgroundColor}`
      : `background-color: ${primary}`}
`;

export const FormButton = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
