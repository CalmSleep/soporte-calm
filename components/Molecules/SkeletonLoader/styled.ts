import styled, {keyframes} from "styled-components";
import { IPropsStyles } from "./types"

const skeletonLoading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const Container = styled.div<IPropsStyles>`
  background-color: ${props => props.theme.colors.christmasSilver};
  border-radius: ${props => props.$borderRadius && props.$borderRadius};
  display: inline-block;
  height: ${props => props.$height && props.$height};
  width: ${props => props.$width && props.$width};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
    animation: ${skeletonLoading} 1.5s infinite;
  }

  @media ${props => props.theme.devices.mobile}{
    height: ${({ $responsiveMobile }) => $responsiveMobile && $responsiveMobile.height};
  }
`