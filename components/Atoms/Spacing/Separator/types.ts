import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

export type SeparatorProps = {
    color?: ThemeColors;
    width?: string;
    margin?: string;
};

export type SeparatorStyledProps = {
    $color?: ThemeColors;
    $width?: string;
    $margin?: string;
};