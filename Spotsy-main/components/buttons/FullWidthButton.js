import React from "react";
import styled from "styled-components/native";
import { ScreenWidth } from "../dimensions/dimensions";

const StyledButton = styled.Pressable`
  border-width: 1px;
  width: ${ScreenWidth * 0.8}px;
  border-radius: 10px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`}
  ${(props) => props.borderColor && `border-color: ${props.borderColor}`}
`;

export const FullWidthButton = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
