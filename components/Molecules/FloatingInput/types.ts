import { InputProps } from "@/components/Atoms/Input/types";
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

export type FloatingInputProps = {
  label?: string;
  labelRequired?: string;
  labelRequiredColor?: ThemeColors;
  labelColor?: ThemeColors;
  labelBackgroundColor?: ThemeColors;
  input?: InputProps;
  error?: string;
  required?: string;
};

export type LabelStyledProps = {
  $backgroundColor?: ThemeColors;
  $color?: ThemeColors;
  $isFocused?: boolean;
  $input?: boolean;
  $hasError?: boolean;
  $hasRequired?: boolean;
};

export type DniInput = {
  dni: number;
};

export type ErrorInput = {
  [key: string]: string;
};
