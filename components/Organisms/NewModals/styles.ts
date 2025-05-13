import styled from 'styled-components';
import {IStyleModal} from "./types"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div<IStyleModal>`
  background: white;
  border-radius: 8px;
  position: relative;
  max-width: ${({ $maxWidth }) => $maxWidth ? `${$maxWidth}` : "500px"};
  width: 90%;
  max-height: ${({ $maxHeight }) => $maxHeight ? `${$maxHeight}` : "90vh"};
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.devices.mobile} {
    ${({ $responsiveMobile }) => $responsiveMobile && $responsiveMobile.maxHeight && `max-height: ${$responsiveMobile.maxHeight}`};
  }
`;

export const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

export const Content = styled.div<{ $overflow?: "visible" | "hidden" | "clip" | "scroll" | "auto" }>`
  padding: 20px;
  overflow-y: ${props => props.$overflow ? props.$overflow : "auto"};

  @media ${props => props.theme.devices.mobile} {
    padding: 15px 10px;
  }
`;