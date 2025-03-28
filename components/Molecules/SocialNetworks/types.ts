import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

export type ArraySocial = {
  id: number;
  name?: string;
  icon?: JSX.Element;
  width?: string;
  widthMobile?: string;
  height?: string;
  heightMobile?: string;
  padding?: string;
  paddingMobile?: string;
  link?: string;
};

type responsiveMobile = {
  width?: string;
  height?: string;
  gap?: string;
};

export type SocialStyledProps = {
  $width?: string;
  $height?: string;
  $gap?: string;
  $borderRadius?: string;
  $borderSize?: string;
  $responsiveMobile?: responsiveMobile;
};
