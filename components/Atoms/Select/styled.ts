import styled from "styled-components";
import { SelectStyledProps } from "./types";

export const SelectStyles = styled.select<SelectStyledProps>`
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
