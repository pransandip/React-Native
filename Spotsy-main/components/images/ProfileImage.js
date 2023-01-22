import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";

const StyledImage = styled.Image`
  ${(props) => (props.height ? `height: ${props.height}px` : `height:50px`)}
  ${(props) => (props.width ? `width: ${props.width}px` : `width:50px`)}
  border-radius: 50px;
`;

export const ProfileImage = (props) => {
  return (
    <StyledImage source={props.source} {...props} resizeMode="center">
      {props.children}
    </StyledImage>
  );
};
