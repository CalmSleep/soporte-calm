import styled, { keyframes } from "styled-components";

export const CardCart = styled.article<{ $fromCheckout?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 9px;
  row-gap: 0px;
  grid-template-rows: repeat(3, auto);
  padding: 1rem 0.7rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.superSilver};
  @media ${(props) => props.theme.devices.mobile} {
    padding: ${(props) => (props.$fromCheckout ? "1rem 0" : "1rem 0.7rem")};
  }
`;

const placeholderAnimate = keyframes`
  0%{ background-position: -650px 0; }
  100%{ background-position: 650px 0; }
`;

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
    ${(props) => props.theme.colors.superSilver} 2%,
    ${(props) => props.theme.colors.steam} 18%,
    ${(props) => props.theme.colors.superSilver} 33%
  );
  background-size: 1300px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1em;
`;

export const DivProductTitle = styled.div`
  height: 17px;
  grid-column: 2/4;
  grid-row: 1/2;
`;

export const DivImg = styled.div`
  grid-column: 1/2;
  grid-row: 1/4;
  img {
    object-fit: cover;
    border-radius: 2px;
  }
`;

export const DivProductText = styled.div`
`;

export const ButtonWrapper = styled.div`
  grid-column: 3/4;
  grid-row: 1/2;
  justify-self: flex-end;
`;

export const ProductCounter = styled.div`
  grid-column: 1/4;
  grid-row: 3/4;
  align-self: flex-end;
`;

export const PricesContainerSection = styled.div`
  grid-column: 3/4;
  grid-row: 2/4;
  align-self: flex-end;
`;

export const LoadingTotal = styled.div`
  width: 80px;
  height: 15px;
`