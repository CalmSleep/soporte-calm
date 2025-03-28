import { ChangeEvent, RefObject } from "react";
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

type OptionType = string | { label: string; value: string };

export type SelectProps = {
  name?: string;
  value?: string;
  options: OptionType[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  disableOptions?: boolean;
  disabledValues?: string[];
  width?: string;
  error?: boolean;
  color?: ThemeColors;
  height?: string;
  backgroundColor?: ThemeColors;
  borderColor?: ThemeColors;
  borderColorFocused?: ThemeColors;
  borderRadius?: string;
  refSelect?: RefObject<HTMLSelectElement>;
};

export type SelectStyledProps = {
  $width?: string;
  $borderColor?: ThemeColors;
  $borderColorFocused?: ThemeColors;
  $color?: ThemeColors;
  $height?: string;
  $backgroundColor?: ThemeColors;
  $borderRadius?: string;
};
