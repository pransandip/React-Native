import React from "react";
import styled from "styled-components/native";

const StyledView = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export const ParkingSpotListDetailsWrapper = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};
