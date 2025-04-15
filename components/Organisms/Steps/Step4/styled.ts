import styled from "styled-components";

export const Cointainer = styled.div`
  display: flex;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;

  @media ${(props) => props.theme.devices.biggerMobile} {
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const ImageHover = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-right: 8px;
  gap: 5px;
  overflow: hidden;

  .icon {
    display: none;
    z-index: 2;
  }

  &:hover .icon {
    display: flex;
  }

  &::after {
    content: "";
    position: absolute;
    border-radius: 5px;
    inset: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.2s ease;
    z-index: 1;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CointainerInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  align-items: start;
`;
