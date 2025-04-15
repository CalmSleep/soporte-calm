import styled from "styled-components";
import { SectionHeaderStyledProps } from "./types";

export const SectionHeaderStyles = styled.section<SectionHeaderStyledProps>`
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: ${({ $height }) => ($height ? $height : "auto")};
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ? theme.colors[$backgroundColor] : "white"};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "none"};
  padding: ${({ $padding }) => ($padding ? $padding : "1rem")};
  gap: ${({ $gap }) => ($gap ? $gap : "1rem")};
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justifyContent }) =>
    $justifyContent ? $justifyContent : "center"};
  align-items: ${({ $alignItems }) => ($alignItems ? $alignItems : "left")};

  @media ${(props) => props.theme.devices.biggerMobile} {
    width: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.width}`};
    height: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.height}`};
    padding: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.padding}`};
    gap: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.gap}`};
  }
`;
