import React from "react";
import styled from "styled-components/native";

const StyledImage = styled.ImageBackground`
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.29;
  shadow-radius: 4.65px;
  elevation: 7;

  ${(props) =>
    props.borderRadius ? `border-radius: ${props.borderRadius}px` : ""}
  ${(props) => (props.height ? `height: ${props.height}px` : "height: 300px")}
    ${(props) => (props.width ? `width: ${props.width}px` : "width: 100%")}
`;

export const ParkingSpotListImage = (props) => {
  return (
    <StyledImage source={props.source} {...props}>
      {props.children}
    </StyledImage>
  );
};
