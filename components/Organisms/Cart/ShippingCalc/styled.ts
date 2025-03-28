import styled from "styled-components"

export const Shipping = styled.section`
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, auto);
  justify-content: space-between;
  align-items: flex-start;
`

export const DivCalcCP = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: center;
  row-gap: 5px;
  column-gap: 10px;
  grid-column: 1/3;
  grid-row: 2/3;
  width: 80%;
  justify-self: center;

  input {
    padding: 3px 5px;
    max-height: 1.5rem;

    &:focus {
      border: 2px solid ${({ theme }) => theme.colors.yellowCalm};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 1.5rem;
    width: 5.5rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.weldedIron};
      border-color: ${({ theme }) => theme.colors.weldedIron};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.yellowCalm};
    }
  }
`

export const DivError = styled.div<{ showErr?: boolean }>`
  display: ${(props) => (props.showErr ? "block" : "none")};
  grid-column: 1/3;
  grid-row: 2/3;
`

export const DeliverDate = styled.div`
  margin: 0.5rem;
`

export const DivShippingText = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  justify-self: flex-end;
`
export const DivShippingCalc = styled.div`
  display: flex;
  gap: 5px;
`
