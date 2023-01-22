import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import { colors } from "../colors/colors";
const { secondary, white, primary } = colors;

const StyledTextArea = styled.View`
  background-color: ${white};
  border: 1px solid ${primary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  font-size: 16px;
  height: 100px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${primary};
`;

export const TextArea = (props) => {
  return (
    <StyledTextArea {...props}>
      <Text>{props.children}</Text>
    </StyledTextArea>
  );
};
