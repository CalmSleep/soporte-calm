import styled, { keyframes } from "styled-components";
import { IPropsStyled } from "./types"

export const spinAnimation = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

export const SpinnerCenterContainer = styled.div<IPropsStyled>`
  width:  ${props => props.$isCenterScreen ? "100%" : "15px"};
  height:   ${props => props.$containerHeight ? props.$containerHeight  : props.$isCenterScreen ? "550px" : "15px"};
  background: rgba(241, 242, 243, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

export const RotatingDiv = styled.div<IPropsStyled>`
  position: ${props => props.$hasOverlay ? "" : "absolute"};
  animation: ${spinAnimation} 1s linear infinite;
  width: 80px;
  height: 80px;
  top: 0;
  left: 0;
  border-radius: 50%;
  box-shadow: 0 2px 0 0  ${props => props.$isBlack ? "black" : "white"};
  transform-origin: 40px 41px;
  box-sizing: content-box;
`;

export const SpinnerContainer = styled.div<IPropsStyled>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(241, 242, 243, 0);
  margin: 7px 0 0 6px;
`;

export const SpinnerCenter = styled.div<IPropsStyled>`
  width:  ${props => props.$width ? props.$width : "8px"};
  height:  ${props => props.$height ? props.$height : "8px"};
  border-radius: 50%;
  border-top: 1.5px solid ${props => props.$isBlack ? "black" : "white"};
  animation: ${spinAnimation} 1s linear infinite;
  transform: translate(-50%, -50%);
`
