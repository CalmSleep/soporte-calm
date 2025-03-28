import styled from "styled-components";
import { MarginStyledProps } from "./types"

export const MarginStyles = styled.div<MarginStyledProps>`
  margin: ${({ $margin }) => $margin};
  @media ${props=>props.theme.devices.mobile}{
    margin: ${({ $marginMobile }) => $marginMobile};
    }   
  @media ${props=>props.theme.devices.middleResolutionDesktop}{
    margin: ${({ $marginBiggerDesktop }) => $marginBiggerDesktop};
  }   
`;