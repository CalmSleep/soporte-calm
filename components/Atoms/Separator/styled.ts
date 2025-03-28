import styled from "styled-components";
import { SeparatorStyleProps } from "./types"

export const Styles = styled.hr<SeparatorStyleProps>`
    margin: ${({ $margin }) => $margin ? `${$margin}` : "15px 0px"};
    background-color: ${({ theme, $color }) => !$color && theme.colors.millionGray};
    width: ${({ $size }) => $size === "small" ? "20%" : $size === "medium" ?  "50%" : "100%"};
    border: ${({ theme, $color }) => $color && `0.1px solid ${theme.colors[$color]}`};
`;