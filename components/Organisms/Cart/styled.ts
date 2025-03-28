import styled, { keyframes } from "styled-components"

const placeholderAnimate = keyframes`
  0%{ background-position: -650px 0; }
  100%{ background-position: 650px 0; }
`

export const Content = styled.div`
  overflow: hidden;
  background: ${(props) => props.theme.colors.black};
  position: relative;
  margin: 5px;
  animation-duration: 1.7s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ${placeholderAnimate};
  background: ${(props) => props.theme.colors.lynxWhite};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.superSilver} 2%,
    ${({ theme }) => theme.colors.steam} 18%,
    ${({ theme }) => theme.colors.superSilver} 33%
  );
  background-size: 1300px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const SectionCards = styled.section`
  max-height: 65%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 5%;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.beluga};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.argent};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.stoneCold};
  }
`

export const PEmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 2rem 0;
`

export const DivTotal = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SectionSubtotal = styled.section`
  margin: 1rem 0;
`

export const DivSubtotal = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: space-between;
`

export const LoadingSubtotal = styled.div`
  width: 80px;
  height: 10px;
`

export const LoadingTotal = styled.div`
  width: 80px;
  height: 25px;
`

export const DivToast = styled.div`
  display: none;
`
