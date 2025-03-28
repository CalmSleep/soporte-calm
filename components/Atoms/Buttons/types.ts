import { theme } from "@/utils/Theme";
import { MouseEvent, ChangeEvent, FormEvent } from "react";

type ThemeColors = keyof typeof theme.colors;
type Fonts = keyof typeof theme.fonts;

type responsiveMobile = {
  fontSize?: string;
  width?: string;
  height?: string;
};

export type ButtonProps = {
  children?: React.ReactNode;
  targetBlank?: boolean;
  borderRadius?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  backgroundColor?: ThemeColors;
  size?: "big" | "medium" | "mediumlarge" | "small" | "xsmall" | "none";
  backgroundColorHover?: ThemeColors;
  textColor?: ThemeColors;
  textColorHover?: ThemeColors;
  borderColor?: ThemeColors;
  href?: string;
  type?: "submit";
  fontSize?: string;
  font?: Fonts;
  width?: string;
  height?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | FormEvent<HTMLButtonElement>
  ) => void;
  className?: string;
  error?: boolean;
  title?: string;
  sizeMobile?: "big" | "medium" | "mediumlarge" | "small" | "xsmall" | "none";
  disableStyles?: boolean;
  responsiveMobile?: responsiveMobile;
};

export type ButtonStyledProps = {
  $borderRadius?: string;
  $backgroundColor?: ThemeColors;
  $size?: "big" | "medium" | "mediumlarge" | "small" | "xsmall" | "none";
  $backgroundColorHover?: ThemeColors;
  $textColor?: ThemeColors;
  $textColorHover?: ThemeColors;
  $borderColor?: ThemeColors;
  $fontSize?: string;
  $font?: Fonts;
  $width?: string;
  $height?: string;
  $responsiveMobile?: responsiveMobile;
  $error?: boolean;
  $sizeMobile?: "big" | "medium" | "mediumlarge" | "small" | "xsmall" | "none";
  $disableStyles?: boolean;
};

export type ButtonAttributesProps = {
  select: boolean;
  disabled: boolean;
  style: {
    backgroundColor: string;
  };
  onClick: (e: MouseEvent<HTMLInputElement>) => void;
  title: string;
  ariaLabel: string;
  isRP?: boolean;
};
export type BtnColor = {
  $select: boolean;
};
