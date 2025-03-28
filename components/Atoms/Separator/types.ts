import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors

export type SeparatorProps = {
    children?: React.ReactNode;
    size?: "medium" | "small";
    color?: ThemeColors
    margin?: string
};

export type SeparatorStyleProps = {
    $size?: "medium" | "small";
    $color?: ThemeColors
    $margin?: string
};