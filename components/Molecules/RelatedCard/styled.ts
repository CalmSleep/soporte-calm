import styled from "styled-components"

export const Article = styled.article`
  display: flex;
  margin: 0.4rem;
  flex-direction: column;
  justify-content: space-between;
`

export const DivUnit = styled.div`
  width: auto;
  max-width: 100%;
  position: relative;
  height: max-content;
`

export const TitleBoldDiv = styled.div`
  white-space: break-spaces;
  text-transform: capitalize;
`

export const VariationsDiv = styled.div`
  margin-top: 0.1rem;
  white-space: break-spaces;
  width: 80%;
`

export const AddToCart = styled.div<{ $notEnabled?: boolean }>`
  background-color: ${({theme, $notEnabled}) =>
    $notEnabled
      ? theme.colors.millionGray
      : theme.colors.fadingHorizon};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2%;
  bottom: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  button {
    display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.white};
  font-size: 1.4rem;
  padding-bottom: 2.5px;
  }

  &:hover {
    cursor: ${(props) => (props.$notEnabled ? "not-allowed" : "pointer")};
    background-color: ${({theme, $notEnabled}) =>
      $notEnabled ? theme.colors.millionGray : theme.colors.elegantPurpleGown};
  }
`