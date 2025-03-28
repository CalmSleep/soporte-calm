import styled from 'styled-components';
import { SegmentoProps } from "./types"

export const SquareBar = styled.div<{ $height?: string}>`
  display: flex;
  height: ${props => props.$height ? props.$height : "8px"};
  width: 95%;
  @media ${props => props.theme.devices.mobile} {
    height: 8px;
  }
`;

export const SquareSegment = styled.div<SegmentoProps>`
  flex: 1; 
  background-color: ${({ $activo, theme }) => ($activo ? theme.colors.madForMango : theme.colors.orochimaru)}; 
  border-radius: 50px;
  margin-right: 4px;
`;

export const CircleBar = styled.div<SegmentoProps>`
  display: flex;
  flex-direction: ${props => props.$isVertical ? "column" : "row"};
`;

export const CircleContainer = styled.div<SegmentoProps>`
  ${props => !props.$isVertical && "display: flex; justify-content: center; align-items: center"};
`

export const CircleSegment = styled.div<SegmentoProps>`
  height: 15px; 
  width: 15px;
  border-radius: 50%;
  background-color: ${({ $activo, theme }) => ($activo ? theme.colors.madForMango : theme.colors.orochimaru)}; 
`;

export const Connector = styled.div<SegmentoProps>`
  display: ${props => props.$isLast ? "none" : "block"};
  ${props => props.$isVertical && "margin-right: 7px"};
  ${props => props.$isVertical ? "height: 80px" : "width: 120px"};
  ${props => props.$isVertical 
  ? `border-right: 2px solid ${props.theme.colors.yellowCalm}`
  : `border-top: 2px solid ${props.theme.colors.yellowCalm}`} ;

  @media ${props => props.theme.devices.mobile} {
    ${props => props.$isVertical ? "height: 80px" : "width: 80px"};
  }
`