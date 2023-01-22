import React from "react";
import styled from "styled-components/native";

const StyledView = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 100000;
`;

export const RightIcon = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};
