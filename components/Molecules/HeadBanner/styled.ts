import styled, { css, keyframes } from "styled-components";

export const StyledBanner = styled.div`
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(-114%);
  }
`;

export const MarqueeContainer = styled.div<{ $isMarqueeActivate : boolean }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  
  @media ${props => props.theme.devices.mobile} {
    display: ${props => props.$isMarqueeActivate && "flex"};
  }
`;


export const MarqueeWrapperDesktop = styled.div<{ $isMarqueeActivate : boolean, $margin : number, $isSecondText? : boolean, $isSommier?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${props => props.$isSecondText ? `${props.$margin}px` : '25px'};
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.regular};
  strong, b {
    font-family: ${(props) => props.theme.fonts.extraBold};
  }
  font-size: 0.8rem !important;

  @media ${props => props.theme.devices.mobile} {
    animation: ${props => props.$isMarqueeActivate ? css`${marqueeAnimation} ${props.$isSommier ? "14.5s" : "14.5s"} linear infinite` : 'none'};
  }
  @media only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    font-size: 0.8rem !important;
  }
  @media screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 0.8rem !important;
  }
`;

export const MarqueeWrapperMobile = styled.div<{ $isMarqueeActivate : boolean, $margin : number, $isSecondText? : boolean, $isSommier?: boolean}>`
  display: none;

  @media ${props => props.theme.devices.mobile} {
    animation: ${props => props.$isMarqueeActivate ? css`${marqueeAnimation} ${props.$isSommier ? "14.5s" : "14.5s"} linear infinite` : 'none'};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${props => props.$isSecondText ? `${props.$margin}px` : '25px'};
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.fonts.regular};
    strong, b {
      font-family: ${(props) => props.theme.fonts.extraBold};
    }
    font-size: 0.8rem !important;
  }
  @media only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    font-size: 0.8rem !important;
    p {
      font-size: 0.8rem !important;
    }
  }
  @media screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 0.8rem !important;
    p {
      font-size: 0.8rem !important;
    }
  }
`;

export const CyberText = styled.div`
  div span {
    padding: 0 2px;
  }
`