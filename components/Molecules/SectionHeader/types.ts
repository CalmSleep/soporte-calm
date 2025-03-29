import { TypographyProps } from "@/components/Atoms/Typography/types";
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

export type SectionHeaderProps = {
  title: string;
  spam?: string;
  paragraph?: string;
  children?: React.PropsWithChildren<React.ReactNode>;
  titleStyles?: TypographyProps;
  spamStyles?: TypographyProps;
  paragraphStyles?: TypographyProps;
  sectionHeaderStyles?: SectionHeaderStyledProps;
};

type ResponsiveMobile = {
  padding?: string;
  gap?: string;
};

export type SectionHeaderStyledProps = {
  $width?: string;
  $height?: string;
  $backgroundColor?: ThemeColors;
  $borderRadius?: string;
  $padding?: string;
  $gap?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $responsiveMobile?: ResponsiveMobile;
};
