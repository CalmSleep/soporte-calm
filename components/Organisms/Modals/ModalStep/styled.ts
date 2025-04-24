import styled from "styled-components";

export const ContainerModal = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;

  /* Aquí permitimos que el contenido interno scrollee */
  overflow-y: auto;

  /* Evita desplazamiento lateral raro en móviles */
  overflow-x: hidden;

  @media ${(props) => props.theme.devices.biggerMobile} {
    font-size: 13px;
  }

  .header-closer-2 {
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 20;

    top: 2rem;
    left: 2rem;
    display: flex;
    align-items: center;

    @media ${(props) => props.theme.devices.biggerMobile} {
      top: 1rem;
      left: 1rem;
    }
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
