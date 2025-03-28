import styled from "styled-components"

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  button {
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }

  button:disabled {
    color: ${({ theme }) => theme.colors.millionGray};
    cursor: initial;
  }
`

export const DivQuantity = styled.div`
  min-width: 1rem;
`
