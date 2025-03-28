import styled from "styled-components";
import { SocialStyledProps } from "./types";

export const Container = styled.div<SocialStyledProps>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => `${$gap}`};

  @media ${(props) => props.theme.devices.biggerMobile} {
    gap: ${({ $responsiveMobile }) =>
      $responsiveMobile && `${$responsiveMobile.gap}`};
  }
`;

export const SocialNetworkA = styled.a<SocialStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: ${({ $height }) => ($height ? $height : "auto")};
  background: var(--Escala-Secundario-1-Blanco, #fff);
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "100%"};
  border: ${({ $borderSize }) => `${$borderSize}`} solid
    var(--Secundario-1, #202020);

  @media ${(props) => props.theme.devices.biggerMobile} {
    * {
      width: ${({ $responsiveMobile }) =>
        $responsiveMobile && `${$responsiveMobile.width}`};
      height: ${({ $responsiveMobile }) =>
        $responsiveMobile && `${$responsiveMobile.height}`};
    }
  }
`;
