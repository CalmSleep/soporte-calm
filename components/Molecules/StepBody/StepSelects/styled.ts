import styled from "styled-components";

export const PieceList = styled.div`
  display: flex;
  padding: 4px 50px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;

export const PieceItem = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: stretch;

  input[type="text"] {
    margin-left: 8px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;
