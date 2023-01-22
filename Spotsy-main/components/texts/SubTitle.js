import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";

const { primary } = colors;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  ${(props) =>
    props.textAlign ? `textAlign: ${props.textAlign}` : `textAlign: center`}
  ${(props) => (props.color ? `color: ${props.color}` : `color: ${primary}`)}
`;

export const SubTitle = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
