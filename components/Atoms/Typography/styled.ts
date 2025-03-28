import styled, { css }  from "styled-components";
import { TypographyStyledProps } from "./types"
import Link from "next/link";
import { createGlobalStyle } from 'styled-components';

export const TypographyStyled = styled.div<TypographyStyledProps>`
  font-family: ${({ $font, theme }) => $font && theme.fonts[$font]};
  color: ${({ $color, theme }) => $color && theme.colors[$color]};
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}` : "1em")};
  ${({ $align }) => $align && `text-align: ${$align}`};
  text-decoration: ${({ $textDecoration }) => $textDecoration ? `${$textDecoration}` : "none"};
  ${({ $width }) => $width && `width: ${$width}%`};
  ${({ $lineHeight }) => $lineHeight && `line-height: ${$lineHeight}`};
  ${props => props.$textStroke && `-webkit-text-stroke: ${props.$textStroke};`}
  ${({ $letterSpacing }) => $letterSpacing && `letter-spacing: ${$letterSpacing}`};
/*   font-weight: ${({ $fontWeight }) => $fontWeight ? $fontWeight : 500}; */
  @media ${props=>props.theme.devices.mobile}{
    width: ${({ $responsiveMobile }) => $responsiveMobile?.width ? `${$responsiveMobile.width}` : "auto"};
    font-size: ${({ $responsiveMobile }) => $responsiveMobile?.fontSize && `${$responsiveMobile.fontSize}`};
    text-align: ${({ $responsiveMobile }) => $responsiveMobile && `${$responsiveMobile.align}`};
    color: ${({ $responsiveMobile, theme }) => $responsiveMobile?.color && theme.colors[`${$responsiveMobile.color}`]};
    ${({ $responsiveMobile }) => $responsiveMobile && $responsiveMobile.lineHeight && `line-height: ${$responsiveMobile.lineHeight}`};
  }   

  ${({ $hasLink }) =>
    $hasLink &&
    css`
      a {
        color: ${({ theme }) => theme.colors.yellowCalm};
      }
  `}
  ${({ $hasStrong }) =>
    $hasStrong &&
    css`
      strong, b {
        font-family: ${(props) => props.theme.fonts.extraBold};
      }
  `}
  ${({ $HoverColor }) =>
    $HoverColor &&
    css`
      &:hover {
        color: ${(props) => props.theme.colors[$HoverColor]};
      }
  `}
`;

export const Bold = styled.span`
  font-family: ${props => props.theme.fonts.extraBold}, "Arial";
`

export const LinkStyled = styled(TypographyStyled).attrs({ as: Link })`
`;

export const RedirectStyles = createGlobalStyle<{ $isLoading?: boolean}>`
  html, body, *, *::before, *::after {
    cursor: ${({ $isLoading }) => ($isLoading ? 'wait !important' : '')} ;  
    pointer-events: ${({ $isLoading }) => ($isLoading ? 'none' : 'auto')} !important;
  }
`;