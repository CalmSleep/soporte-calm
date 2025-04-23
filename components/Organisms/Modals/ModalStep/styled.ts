import styled from "styled-components";

export const ContainerModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  top: 0;
  left: 0;
  position: fixed;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  .header-closer-2 {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 5rem;
    top: 5rem;
    z-index: 20;
  }

  @media ${(props) => props.theme.devices.biggerMobile} {
    .header-closer-2 {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      position: absolute;
      left: 2rem;
      top: 2rem;
      z-index: 20;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0px 20px;

  @media ${(props) => props.theme.devices.biggerMobile} {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 0px 8px;
`;
