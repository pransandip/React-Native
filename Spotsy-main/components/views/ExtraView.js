import React from "react";
import styled from "styled-components/native";

const StyledView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraView = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};
