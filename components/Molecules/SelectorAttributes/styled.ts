import React from "react";
import styled from "styled-components"

export const ContainerSize = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  
  @media ${({theme}) => theme.devices.biggerMobile} {
    gap: 0;
  }

 ${({ children }) => {
    if (React.Children.count(children) === 2) {
      return `
        justify-content: center;
        gap: 36px;
        flex-wrap: nowrap;

        @media screen and (max-width: 1024px) {
          gap: 0px;
          justify-content: space-between;
        }
      `;
    } else if (React.Children.count(children) === 4) {
      return `
        justify-content: space-between;
        gap: 10px;
        * {
          width: 48% !important;
        }
        @media screen and (max-width: 1024px) {
          gap: 6px;
        }
      `;
    }
  }}
`

export const SelectHeight = styled.div<{ $isCombo?:boolean }>`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;

  button {
    display: flex;
    height: ${props => props. $isCombo ? "80px" : "65px"};
    width: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0rem;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.white};
    &:hover {
      transition: none;
    }

    @media ${({theme}) => theme.devices.mobile} {
      height: ${props => props. $isCombo ? "70px" : "55px"};
    } 
  }

  .selected {
    border: 2px solid ${({theme}) => theme.colors.yellowCalm};
  }

  .notSelected {
    border: 0.5px solid ${({theme}) => theme.colors.millionGray};

  }
`

export const HeightContainer = styled.div`
  @media ${props => props.theme.devices.mobile}{
    margin-bottom: 0.5rem;
  }
`

export const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`

export const SelectColor = styled.div`
  display: flex;
  gap: 1rem;
  margin: 10px 0;
`
export const WrapperPrices = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

export const ContainerPack = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const PillOfert = styled.div`
  background-color: ${props => props.theme.colors.yellowCalm};
  padding: 3px 10px;
  border-radius: 5px;
  width: 75%;
`

export const TextSelected = styled.div`
  display: flex;
  gap: 5px;
`