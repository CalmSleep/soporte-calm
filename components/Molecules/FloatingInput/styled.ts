import styled from "styled-components";
import { InputWrapperProps, LabelStyledProps } from "./types";

export const InputWrapper = styled.div<InputWrapperProps>`
  width: ${({ $width }) => ($width ? $width : "100%")};
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop : "")};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  @media ${(props) => props.theme.devices.biggerMobile} {
    width: ${({ $responsiveMobile }) =>
      $responsiveMobile?.width ? $responsiveMobile?.width : "100%"};
  }
`;

export const Label = styled.span<LabelStyledProps>`
  position: absolute;
  left: 15px;
  top: ${({ $isFocused, $input }) => ($isFocused || $input ? "14px" : "10px")};
  pointer-events: none;
  transition: 0.3s ease all;
  padding: 5px;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : "white"};
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : theme.colors.brilliantLiquorice};
`;

export const Menssage = styled.span<LabelStyledProps>`
  color: ${({ theme, $hasError, $hasRequired }) =>
    $hasError
      ? theme.colors.rareRed
      : $hasRequired
      ? theme.colors.madForMango
      : theme.colors.brilliantLiquorice};
  transition: 0.3s ease all;
`;
