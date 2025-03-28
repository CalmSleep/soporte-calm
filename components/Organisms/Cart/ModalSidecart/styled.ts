import styled, { keyframes } from "styled-components";

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const ModalSidecart = styled.article<{$isOpen?: boolean | (() => void)}>`

    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.60);
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    justify-content: flex-end;
    align-items: flex-start;

    .modal-container {
        background-color: white;
        position: relative;
        overflow-y: auto;
        animation: ${slideInAnimation} 0.3s ease;
        height: 100vh;
        /* width: 90%; */
        width: 385px;
        margin-left: 1.2rem;
        scrollbar-width: thin;
    }
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
    } 
    .header-cart-closer {
        display: flex;
        padding: 10px;
        background-color: #F5A203;
        color: white;
        justify-content: flex-end;
        align-items:center;
        font-size: 1.1rem;
        font-weight: 700;
    }

    .header-closer-2 {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
    }
    .header-closer-1{
      font-family: ${props => props.theme.fonts.light}, "Arial";
      margin-right: 20px;
    }

    
    @media (min-width: 390px) {
    }
`

