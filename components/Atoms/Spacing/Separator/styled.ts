import styled from "styled-components";
import { SeparatorStyledProps } from "./types";

export const SeparatorStyles = styled.div<SeparatorStyledProps>`
  margin: ${({ $margin }) => ($margin ? `${$margin}` : `15px 0`)};
  border-top: ${({ $width }) => ($width ? `${$width}` : `1px`)} solid
    ${({ $color, theme }) => ($color ? theme.colors[$color] : theme.colors.explosiveGray)};
`;
