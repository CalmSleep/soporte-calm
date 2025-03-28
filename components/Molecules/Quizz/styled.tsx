import styled from "styled-components";

export const Container = styled.div<{$quizzActive: boolean}>`
  position: relative;
  display: ${(props) => props.$quizzActive ? "block" : "none"};

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9998;
  }
`

export const DivQuizz = styled.div`
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  bottom: auto !important;
  margin: auto;
  box-shadow: 2px 8px 23px 3px rgba(0, 0, 0, 0.2);
  z-index: 9998;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  max-width: 80% !important;
  max-height: 80% !important;
`