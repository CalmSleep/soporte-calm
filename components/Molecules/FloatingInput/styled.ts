import styled from "styled-components";
import { LabelStyledProps } from "./types";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

export const Label = styled.span<LabelStyledProps>`
  position: absolute;
  left: 15px;
  pointer-events: none;
  transition: 0.3s ease all;
  padding: 5px;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : "white"};
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : theme.colors.brilliantLiquorice};
`;
