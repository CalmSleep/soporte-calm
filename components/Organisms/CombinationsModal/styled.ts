import styled from "styled-components";

export const CombinationsModalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  
  @media ${(props) => props.theme.devices.biggerMobile} {
    flex-direction: column;
  }
`;

export const ButtonCloseDiv = styled.div`
  position: absolute;
  color: ${props => props.theme.colors.millionGray};
  border: none;
  background: none;
  right: 0;
  top: 0;

  p {
    cursor: pointer;
    float: right;
    padding: 0;
  }
`;

export const ConfigImage = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.$isSelected ? props.theme.colors.yellowCalm : props.theme.colors.paternoster};
  border-radius: 8px;
  padding: 16px 8px;
  cursor: pointer;
  min-height: 120px;
  max-height: 120px;
  width: 32%;
  
  &:hover {
    border-color: ${props => props.theme.colors.yellowCalm};
    transition: all 0.3s ease;
  }

  @media ${(props) => props.theme.devices.biggerMobile} {
    flex-wrap: nowrap;
    width: 30%;
  }
`;

export const ConfigGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;

export const ContainerBuilder = styled.div`
  width: 50%;

  @media ${(props) => props.theme.devices.biggerMobile} {
    width: 100%;
    height: 300px;
  }
`

export const ContainerSelector = styled.div`
  width: 50%;

  @media ${(props) => props.theme.devices.biggerMobile} {
    width: 100%;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  gap: 20px;

  button {
    width: 50%;
  }
`

export const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.devices.biggerMobile} {
    display: none;
  }
`

export const MobileContainer = styled.div`
  display: none;

  @media ${(props) => props.theme.devices.biggerMobile} {
    display: flex;
    flex-direction: column;
  }
`

