import styled from "styled-components";
import { SelectStyledProps } from "./types";

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectStyles = styled.select<SelectStyledProps>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "8px"};
  width: ${({ $width }) => ($width ? $width : "100%")};
  padding: 15px;
  padding-right: 45px; /* espacio para el ícono */
  font-size: 16px;
  outline: none;
  border: 2px solid
    ${({ $borderColor, theme }) =>
      $borderColor ? theme.colors[$borderColor] : theme.colors.millionGray};
  &:focus {
    border: 2px solid
      ${({ $borderColorFocused, theme }) =>
        $borderColorFocused
          ? theme.colors[$borderColorFocused]
          : theme.colors.dullViolet};
  }
  color: ${({ $color, theme }) => ($color ? theme.colors[$color] : "offBlack")};
  height: ${({ $height }) => ($height ? $height : "auto")};
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ? theme.colors[$backgroundColor] : "white"};
`;

export const OptionStyles = styled.option<SelectStyledProps>`
  position: relative;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "8px"};
  width: ${({ $width }) => ($width ? $width : "100%")};
  padding: 15px;
  font-size: 16px;
  outline: none;
  border: 2px solid
    ${({ $borderColor, theme }) =>
      $borderColor ? theme.colors[$borderColor] : theme.colors.millionGray};
  &:focus {
    border: 2px solid
      ${({ $borderColorFocused, theme }) =>
        $borderColorFocused
          ? theme.colors[$borderColorFocused]
          : theme.colors.dullViolet};
  }
  color: ${({ $color, theme }) => ($color ? theme.colors[$color] : "offBlack")};
  height: ${({ $height }) => ($height ? $height : "auto")};
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ? theme.colors[$backgroundColor] : "white"};
`;

export const SelectIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  pointer-events: none;

  svg {
    width: 24px;
    height: 24px;
  }
`;
