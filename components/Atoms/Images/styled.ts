import styled from "styled-components";
import { ImageStyledProps } from "./types";
import Image from "next/image";

export const ImageStyles = styled.img<ImageStyledProps>`
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: ${({ $height }) => ($height ? $height : "auto")};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "none"};
  object-fit: ${({ $objectFit }) => $objectFit};
  transition: ${({ $transition }) => $transition};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  opacity: ${({ $opacity }) => $opacity};
  &:hover {
    transform: ${({ $transform }) => $transform};
    transition: 1.5s;
  }
  @media ${(props) => props.theme.devices.biggerMobile} {
    width: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.width}`};
    height: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.height}`};
    text-align: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.align}`};
    border-radius: ${({ $responsiveMobile }) =>
      $responsiveMobile ? $responsiveMobile.borderRadius : "none"};
    margin: ${({ $responsiveMobile }) =>
      $responsiveMobile ? $responsiveMobile.margin : "none"};
    display: ${({ $responsiveMobile }) =>
      $responsiveMobile && $responsiveMobile.display};
  }
`;

export const StyledLCPImage = styled(Image)<ImageStyledProps>`
  border-radius: ${({ $borderRadius }) => $borderRadius};
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: ${({ $height }) => ($height ? $height : "auto")};
  ${({ $aspectRatio }) => $aspectRatio && `aspect-ratio: ${$aspectRatio};`};
  object-fit: ${({ $objectFit }) => $objectFit};

  @media ${(props) => props.theme.devices.biggerMobile} {
    width: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.width}`};
    height: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.height}`};
    border-radius: ${({ $responsiveMobile }) =>
      $responsiveMobile ? $responsiveMobile.borderRadius : "none"};
  }
`;
