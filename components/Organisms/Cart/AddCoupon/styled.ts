import styled from "styled-components";

export const DivSideCart = styled.div`
  button {
    display: flex;
    gap: 5px;
  }
`

export const UlCoupons = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 0.7rem;
  align-items: center;
  flex-direction: column;
  gap: 6px;
`

export const LiAddedCoupon = styled.li`
  width: 90%;
  display: flex;
`

export const DivCoupon = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fadingHorizon};
  padding: 5px 8px;
  gap: 3px;
  border-radius: 15px;

  img {
    display: flex;
  }
`


export const DivAddCoupon = styled.div`
  display: flex;
  column-gap: 10px;
  width: 80%;
  margin: 0 auto;

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
    width: 7rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.weldedIron};
      border-color: ${({ theme }) => theme.colors.weldedIron};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.yellowCalm};
    }
  }
`