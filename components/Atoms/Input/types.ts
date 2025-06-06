import { ChangeEvent, RefObject } from "react";
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

type responsiveMobile = {
  width?: string;
  height?: string;
};

export type InputProps = {
  children?: React.ReactNode;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  width?: string;
  error?: boolean;
  color?: ThemeColors;
  colorLabel?: ThemeColors;
  height?: string;
  backgroundColor?: ThemeColors;
  checked?: boolean;
  refInput?: RefObject<HTMLInputElement>;
  autoComplete?: string;
  borderBottom?: string;
  borderColor?: ThemeColors;
  borderColorFocused?: ThemeColors;
  borderRadius?: string;
  checkColor?: ThemeColors;
  checkBorderColor?: ThemeColors;
  padding?: string;
  appearance?: string;
  display?: string;
  fontSize?: string;
  responsiveMobile?: responsiveMobile;
};

export type InputStyledProps = {
  $fontSize?: string;
  $appearance?: string;
  $width?: string;
  $borderBottom?: string;
  $borderColor?: ThemeColors;
  $borderColorFocused?: ThemeColors;
  $color?: ThemeColors;
  $colorLabel?: ThemeColors;
  $height?: string;
  $backgroundColor?: ThemeColors;
  $borderRadius?: string;
  $checkColor?: ThemeColors;
  $checkBorderColor?: ThemeColors;
  $padding?: string;
  $display?: string;
  $responsiveMobile?: responsiveMobile;
};
