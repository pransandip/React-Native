import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors/colors";

const { black, white, secondary } = colors;

const StyledIcon = styled(Ionicons)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ParkingSpotFavoriteIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <StyledIcon
        name={props.is_favorite ? "heart" : "heart-outline"}
        size={40}
        color={props.is_favorite ? secondary : white}
        {...props}
      />
    </TouchableOpacity>
  );
};
