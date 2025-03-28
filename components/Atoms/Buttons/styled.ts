import styled from "styled-components";
import { ButtonStyledProps } from "./types"
import { theme } from "@/utils/Theme";

export const ButtonStyles = styled.button<ButtonStyledProps>`
  background-color: ${({ $backgroundColor, theme, $error }) =>
  $backgroundColor ? $error ? theme.colors.northernBarrensDust : theme.colors[$backgroundColor] : "transparent"};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  width: ${({ $width }) => ($width && `${$width}`)};
  height: ${({ $height }) => ($height && `${$height}`)};
  font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}` : "1em")};
  font-family: ${({ $font, theme }) => $font && theme.fonts[$font]};
  padding: ${({ $size }) =>
    $size === "big"
      ? "20px 50px"
      : $size === "small"
      ? "0.5em 1.5em"
      : $size === "xsmall" 
      ? "0.5em 1em"
      : $size === "mediumlarge"
      ? "0.8em 7.9em"
      : $size === "none" ? "0" : "0.7em 4em"
      };
  cursor: pointer;
  text-decoration: none;
  border: 2px solid ${({$borderColor, theme}) =>
    $borderColor ? theme.colors[$borderColor] : 'transparent'};
  color: ${({ $textColor, theme }) => $textColor ? theme.colors[$textColor] : theme.colors.blackOut};
  transition: 0.3s;

  &:disabled {
    cursor: not-allowed;
    ${props => props.$disableStyles && `
    background-color: ${theme.colors.kinglyCloud};
    border: 2px solid ${theme.colors.kinglyCloud};
    color: ${theme.colors.white};
    `}
  }

  &:disabled:hover {
    background-color: ${theme.colors.kinglyCloud};
    color: ${theme.colors.white};
    ${props => props.$disableStyles && `
    color: ${theme.colors.white};
    `}
  }

  &:hover {
    background-color: ${({ $backgroundColorHover, theme }) => $backgroundColorHover ? theme.colors[$backgroundColorHover] : ""};
    transition: 0.3s;
    color: ${({ $textColorHover, theme }) =>
      $textColorHover && theme.colors[$textColorHover]};
  }

  @media ${props=>props.theme.devices.mobile}{
    width: ${({ $responsiveMobile }) => $responsiveMobile?.width && `${$responsiveMobile.width}`};
    height: ${({ $responsiveMobile }) => $responsiveMobile?.height && `${$responsiveMobile.height}`};
    font-size: ${({ $responsiveMobile }) => $responsiveMobile?.fontSize && `${$responsiveMobile.fontSize}`};
    padding: ${({ $sizeMobile, $size }) =>
    $sizeMobile === "big"
      ? "20px 50px"
      : $sizeMobile === "small"
      ? "0.5em 1.5em"
      : $sizeMobile === "xsmall" 
      ? "0.5em 1em"
      : $sizeMobile === "mediumlarge"
      ? "0.8em 7.9em"
      : $sizeMobile === "none" ? "0" : $size
      };
  }  
`;


export const BtnColor = styled.button<{ $select: boolean , $isRP?: boolean}>`
  position: relative;
  width: ${props => props.$isRP ? "2rem" : "3rem"};
  height: ${props => props.$isRP ? "2rem" : "3rem"};
  border-radius: 2px;
  border: 0.5px solid gray;
  outline: ${props => props.$select ? `2px solid ${theme.colors.yellowCalm};` : "0.5px solid gray"};
  outline-offset: .2rem;  
  cursor: pointer;
  padding: 0;
  background-color: transparent;

  &::before {
    content: "";
    position: absolute;
    width: 70%;
    height: 2px;
    background-color: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    width: 70%;
    height: 2px;
    background-color: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:disabled::before,
  &:disabled::after {
    opacity: 1;
  }
    
`