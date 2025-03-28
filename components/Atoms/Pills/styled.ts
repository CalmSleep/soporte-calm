import styled from "styled-components"
import { PillStyledProps } from "./types"

export const PillStyles = styled.div<PillStyledProps>`
  position: ${props => props.$isAbsolute && "absolute"};
  z-index: 10;
  ${(props) => props.$isRelatedProducts && "z-index: 10;top: 10px;left: 10px;"}
  background-color: ${({ $backgroundColor, $textNew, theme }) =>
    $backgroundColor
      ? theme.colors[$backgroundColor]
      : $textNew
      ? theme.colors.yellowCalm
      : theme.colors.fadingHorizon};
  border-radius: ${({ $isTab }) =>
  $isTab ? "8px 8px 0 0" : "8px"};
  padding: 0.5em 1em;
  ${(props) => props.$isCategoriesSection && `bottom: 2.1em;padding: 5px 10px;`}
  width: ${(props) => props.$isAbsolute || props.$isCategoriesSection ? "fit-content" : "max-content"};
  border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius : "8px"};
`
export const OfferTextContainer = styled.div<PillStyledProps>`
  position: ${props => props.$notAbsolute ? "" : "absolute"};
  z-index: 10;
  ${(props) => props.$isRelatedProducts && "z-index: 10;top: 10px;left: 10px;"}
  border-radius: 8px;
  padding: ${props => props.$fromCart 
  ? "0.4em .7em" 
  : props.$isCategoryComparition
  ? "0.4sem .6em" 
  : "0.5em 1em"} ;
  ${(props) => props.$isCategoryComparition && `top: 1em; left:.5em; padding: 5px 10px;`}
  ${(props) => props.$isCategoriesSection && `bottom: 2.1em;padding: 5px 10px;`}
  white-space: pre-wrap; 
  `
