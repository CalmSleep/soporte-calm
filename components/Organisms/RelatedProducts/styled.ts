import styled from "styled-components"

export const DivRest = styled.section<{ $fromProduct?: boolean, $isMobile?: boolean }>`
  padding: 2.5rem 1rem;
  display: ${ props => props.$isMobile ? "none" : "flex"};
  justify-content: center;
  background-color: ${({ theme, $fromProduct }) =>
    $fromProduct ? theme.colors.lynxWhite : ""};

  @media ${props=>props.theme.devices.biggerMobile} {
    display: none;
  }
`

export const DivTitleAndCards = styled.div`
  display: flex;
  flex-direction: column;
`

export const DivRestMobile = styled.section<{ $isMobile?: boolean}>`
  display: ${ props => props.$isMobile ? "block" : "none"};

  @media ${props=>props.theme.devices.biggerMobile} {
    display: block;
    margin: 0 auto;
    padding: 1rem;
    max-width: 650px;
  }
`

export const DivAlwaysScroll = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
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

export const DivScroll = styled.div`
  @media ${({ theme }) => theme.devices.biggerMobile}
   {
    overflow-x: scroll;
    white-space: nowrap;
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
  }
`

export const DivTitle = styled.div`
  display: flex;
  margin: 1rem 0 0.5rem 0;
`

export const DivCategoriesMobile = styled.div<{ $fromCart?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: ${({ $fromCart }) => ($fromCart ? "unset" : "flex-start")};
  width: 100%;
`

export const DivCategories = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`
