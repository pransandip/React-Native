import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { colors } from "../colors/colors";
import { ScreenHeight } from "../dimensions/dimensions";

const { white } = colors;

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${ScreenHeight * 0.05}px;
`;

export const ParkingSpotListImageWrapper = (props) => {
  return (
    <TouchableOpacity onPress={props.onRouteChange}>
      <StyledView {...props}>{props.children}</StyledView>
    </TouchableOpacity>
  );
};
