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

export const ImagesContainerModal = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;
export const ImageHover = styled.div`
  cursor: pointer;
  display: flex;
  align-items: start;

  .icon {
    display: none;
  }

  &:hover .icon {
    display: flex;
    align-items: center;
  }

  &:hover .image-wrapper::after {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.2s ease;
    z-index: 1;
  }

  img {
    display: block;
    position: relative;
    z-index: 0;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
`;

export const CointainerInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  align-items: start;
`;
