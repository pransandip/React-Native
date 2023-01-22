import styled from "styled-components/native";
import { colors } from "../colors/colors";

const { darkGrey } = colors;

const StyledLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkGrey};
  margin-vertical: 10px;
  ${(props) => (props.mt ? `margin-top: ${props.mt}px` : `margin-top: 0px`)}
  ${(props) =>
    props.mb ? `margin-bottom: ${props.mb}px` : `margin-bottom: 0px`}
`;

export const Line = (props) => {
  return <StyledLine {...props} />;
};
