import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWidth, ScreenHeight } from "../dimensions/dimensions";
import { colors } from "../colors/colors";

const { white, primary } = colors;

const StyledButton = styled.Pressable`
  background-color: ${white};
  width: ${ScreenHeight * 0.05}px;
  height: ${ScreenHeight * 0.05}px;
  border-radius: ${ScreenHeight * 0.2}px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  position: absolute;
  top: ${ScreenHeight * 0.03}px;
  left: ${ScreenWidth * 0.04}px;
  z-index: 1;
  margin-top: ${ScreenHeight * 0.01}px;
`;

export const BackArrow = (props) => {
  return (
    <StyledButton {...props} onPress={props.onPress}>
      <Ionicons
        name="md-arrow-back"
        color={primary}
        size={ScreenHeight * 0.02}
      />
    </StyledButton>
  );
};
