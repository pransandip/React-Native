import React from "react";
import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { ScreenWidth, ScreenHeight } from "../dimensions/dimensions";
import { colors } from "../colors/colors";
import { SmallText } from "../texts/SmallText";

const { black, white, primary } = colors;

const StyledButton = styled.Pressable`
  position: absolute;
  top: ${ScreenHeight * 0.72}px;
  left: ${ScreenWidth * 0.4}px;
  height: 40px;
  width: 80px;
  border-width: 1px;
  border-color: ${primary};
  background-color: ${primary};
  z-index: 1;
  border-radius: 30px;
`;

const StyledIcon = styled(Ionicons)`
  position: absolute;
  top: 10px;
  left: 15px;
`;

const StyledText = styled(SmallText)`
  position: absolute;
  top: 12px;
  right: 20px;
  font-weight: bold;
  font-size: 10px;
`;

export const FloatingListButton = (props) => {
  return (
    <StyledButton {...props} onPress={props.onPress}>
      <StyledIcon name="list-outline" color={white} size={17} />
      <StyledText color={white}>List</StyledText>
    </StyledButton>
  );
};
