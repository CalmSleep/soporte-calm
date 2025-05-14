import styled from 'styled-components';

export const HandleViewContainer = styled.div<{ $isNewModal?: boolean }>`
  display: flex;
  padding: 16px;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.whiteEdgar};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transition: all 0.3s ease;
    background-color: ${props => !props.$isNewModal && props.theme.colors.perfumeHaze};
  }
`;

export const IconNewModule = styled.div<{ $isHovered?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  border: 2px solid ${props => props.theme.colors.lead};
  width: 42px;
  height: 42px;
  cursor: pointer;
  background-color: ${props => props.$isHovered ? props.theme.colors.black : props.theme.colors.white};
  transition: all 0.3s ease;
`;

export const IconContainer = styled.div<{ $isHovered?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;

  background-color: ${props => props.$isHovered ? props.theme.colors.black : props.theme.colors.white};
`;

