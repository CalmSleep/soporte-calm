import styled from "styled-components";

export const Cointainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const ImageHover = styled.div`
  cursor: pointer;
  display: inline-block;
  marginright: 8px;
  &:hover {
    opacity: 0.5;
  }
`;

export const CointainerInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  align-items: start;
`;
