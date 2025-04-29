import styled from "styled-components";

export const CointainCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 16px;
  align-items: center;
  gap: 6px;
  align-self: stretch;

  @media ${(props) => props.theme.devices.biggerMobile} {
    align-items: flex-start;
  }
`;

export const CointainText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  @media ${(props) => props.theme.devices.mobile} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const PieceList = styled.div`
  display: flex;
  padding: 4px 50px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;

  @media ${(props) => props.theme.devices.biggerMobile} {
    padding: 4px 30px;
  }
`;

export const PieceItems = styled.div`
  display: flex;
  padding: 4px 30px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export const PieceItem = styled.label`
  display: flex;
  align-items: center;
  padding: 1px;
  gap: 10px;
  align-self: stretch;
`;

export const ContainerCheckLabel = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;

  input[type="text"] {
    padding: 4px 8px;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 0;
    outline: none;
    background: transparent;
    font-size: 16px;
  }
  @media ${(props) => props.theme.devices.biggerMobile} {
    flex-direction: column;
    align-items: flex-start;
    input[type="text"] {
      padding: 15px 10px;
      font-size: 14px;
    }
  }
`;
