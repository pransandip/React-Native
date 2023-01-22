import React from "react";
import styled from "styled-components/native";

import { colors } from "../colors/colors";

const { white } = colors;

const StyledText = styled.Text`
  color: ${white};
  font-size: 16px;

  ${(props) =>
    props.google === true &&
    `
        padding: 5px;

    `}
`;

export const ButtonText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};
