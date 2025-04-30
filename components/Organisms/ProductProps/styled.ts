import styled from "styled-components";

export const DivSizeText = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 5px;
  margin-bottom: 7px;

  @media ${(props) => props.theme.devices.mobile} {
    margin-top: 3px;
    margin-bottom: 10px;
  }
`

export const DivSizeInfo = styled.div<{ $isActive: boolean }>`
  display: ${({ $isActive }) => ($isActive ? "block" : "none")};
  position: absolute;
  top: 0;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 2px 8px 23px 3px  ${({theme}) => theme.colors.black}50;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
  p {
    letter-spacing: 0;
  }
`