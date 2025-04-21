import styled, { keyframes } from "styled-components";

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const ModalSidecart = styled.article`
   /*  display:flex;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: scroll;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.60);
    justify-content: center;
    align-items: center;

    .modal-container {
        background-color: white;
        position: relative;
        overflow-y: scroll;
        animation: ${slideInAnimation} 0.3s ease;
        height: 100vh;
        width: 90%;
        max-width: 375px;
        margin-left: 1.2rem;
    }

    .header-cart {
      position: relative;
    }

    .header-closer-2 {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 20;
    } */

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0;
  }
`

export const ImageDiv = styled.div`
    height: 90vh;
    width: auto;
    
    @media ${({ theme }) => theme.devices.mobile} {
      height: auto;
      width: 100%;
    }
`
export const ClickedGalley = styled.div`
  /* img {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 10px;
  } */
    width: 80%;
    margin: auto;
    max-width: 1350px;

    @media ${({ theme }) => theme.devices.mobile} {
      width: 100%;
    }
`

export const DivButtonClose = styled.div`
  position: fixed ;
  width: 37px;
  height: 37px;
  padding: 5px;
  margin: 10px;
  background-color: ${props => props.theme.colors.white} !important;
  border-radius: 9999px;
  cursor: pointer;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
  }
`


