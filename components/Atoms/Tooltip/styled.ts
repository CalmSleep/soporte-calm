import styled from "styled-components";

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipText = styled.div<{ $show: boolean }>`
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.theme.colors.lead};
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 5px;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.theme.colors.lead} transparent transparent transparent;
  }
`;

export const ToolTip = styled.div`
  position: relative;
  cursor: pointer;

  & > * {
    position: relative;
    z-index: 1;
  }

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    width: 340px;
    padding: 8px;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    border-radius: 8px;
    font-size: 14px;
    z-index: 999;
    text-align: center;
    display: block;
    pointer-events: none;
  }

  &:hover::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: ${props => props.theme.colors.black} transparent transparent transparent;
    z-index: 1001;
    pointer-events: none;
  }
`;