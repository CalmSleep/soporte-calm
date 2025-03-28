import { theme } from "@/utils/Theme";
import { ReactElement } from "react";

type ThemeColors = keyof typeof theme.colors;
type Fonts = keyof typeof theme.fonts;

type responsiveMobile = {
  align?: string;
  fontSize?: string;
  textShadow?: string;
  color?: ThemeColors;
  lineHeight?: string;
  width?: string;
  letterSpacing?: string;
};

export type TypographyProps = {
  textTag?: "p" | "span" | "strong" | "em" | "a" | "b";
  titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  font?: Fonts;
  fontSize?: string;
  color?: ThemeColors;
  children?: React.ReactNode;
  align?: string;
  textDecoration?: string;
  link?: string;
  width?: number;
  responsiveMobile?: responsiveMobile;
  lineHeight?: string;
  boldTitle?: string | ReactElement;
  textShadow?: string;
  textStroke?: string;
  letterSpacing?: string;
  hasStrong?: boolean;
  hasLink?: boolean;
  HoverColor?: ThemeColors;
  target?: string;
  rel?: string;
  fontWeight?: number;
  handleClick?: () => void;
  isNextLink?: boolean;
  arialLabel?: string;
};

export type TypographyStyledProps = {
  $font?: Fonts;
  $fontSize?: string;
  $color?: ThemeColors;
  $align?: string;
  $textDecoration?: string;
  $width?: number;
  $textShadow?: string;
  $responsiveMobile?: responsiveMobile;
  $lineHeight?: string;
  $letterSpacing?: string;
  $textStroke?: string;
  $hasStrong?: boolean;
  $hasLink?: boolean;
  $HoverColor?: ThemeColors;
  $fontWeight?: number;
};
