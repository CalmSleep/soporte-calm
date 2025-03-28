import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.colors.icedAlmond};
  @media ${(props) => props.theme.devices.mobile} {
    height: 30px;
  }
`