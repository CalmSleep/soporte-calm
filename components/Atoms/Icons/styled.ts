import styled from "styled-components";
import { IconStyledProps } from "./types"

export const IconStyles = styled.div<IconStyledProps>`
    * {
    width: ${({ $width }) => `${$width}`};
    height: ${({ $height }) => `${$height}`};
    }
  padding: ${props => props.$padding ? props.$padding : "0px"};
  ${props => props.$isCenter && `
    display: flex;
    justify-content: center;
    align-items: center;
  `}



  @media ${props=>props.theme.devices.biggerMobile}{
    * {
    width: ${({ $responsiveMobile }) => $responsiveMobile && `${$responsiveMobile.width}`};
    height: ${({ $responsiveMobile }) => $responsiveMobile && `${$responsiveMobile.height}`};
    }
    padding:  ${({ $responsiveMobile }) => $responsiveMobile && `${$responsiveMobile.padding}`};
  }   

`;