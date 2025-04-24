import styled from "styled-components";

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 16px;
  gap: 8px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  gap: 8px;
  font-size: 16px;
  font-style: normal;

  @media ${(props) => props.theme.devices.biggerMobile} {
    font-size: 14px;
    padding: 0px;
  }
`;
