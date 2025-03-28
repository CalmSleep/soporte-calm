import { ChangeEvent, RefObject } from "react";
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

export type InputProps = {
  children?: React.ReactNode;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
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
  borderColor?: ThemeColors;
  borderColorFocused?: ThemeColors;
  borderRadius?: string;
};

export type InputStyledProps = {
  $width?: string;
  $borderColor?: ThemeColors;
  $borderColorFocused?: ThemeColors;
  $color?: ThemeColors;
  $colorLabel?: ThemeColors;
  $height?: string;
  $backgroundColor?: ThemeColors;
  $borderRadius?: string;
};
