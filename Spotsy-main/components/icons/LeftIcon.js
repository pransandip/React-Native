import React from "react";
import styled from "styled-components/native";

const StyledView = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 100000;
`;

export const LeftIcon = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};
