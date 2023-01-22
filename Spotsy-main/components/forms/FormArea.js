import React from "react";
import styled from "styled-components/native";

const StyledFormArea = styled.View`
  width: 90%;
`;

export const FormArea = (props) => {
  return <StyledFormArea {...props}>{props.children}</StyledFormArea>;
};
