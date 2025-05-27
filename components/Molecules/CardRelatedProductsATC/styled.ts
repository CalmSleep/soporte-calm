import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 10px 10px;
  margin: 5px 0;
  border-radius: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const StyledImageContainer = styled.div`
  width: 22%;
  height: 79px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TitleCursor = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;

  &:hover {
    p {
      text-decoration: underline;
    }
  }
`;

export const InfoContainer = styled.div`
  width: 66%;
  padding: 0 0 0 10px;
`;

export const PriceContainer = styled.div`
  display: flex;
`;

export const IconContainer = styled.div`
  width: 22%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const BorderIcon = styled.div<{
  $isOpen?: boolean;
  $isHovered?: boolean;
}>`
  cursor: pointer;
  background-color: ${(props) =>
    props.$isHovered ? props.theme.colors.black : props.theme.colors.white};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$isOpen ? "45px" : "40px")};
  height: ${(props) => (props.$isOpen ? "45px" : "40px")};
  padding: ${(props) => (props.$isOpen ? "12px" : "12px")};

  border-radius: 1000px;
  border: 2px solid
    ${(props) =>
      props.$isOpen ? props.theme.colors.white : props.theme.colors.lead};
`;

export const ColorContainer = styled.div`
  margin: 0 0 0 5px;
  display: flex;
`;

export const EmptyDic = styled.div`
  width: 22%;
`;

export const Desktop = styled.div`
  display: block;

  @media ${(props) => props.theme.devices.mobile} {
    display: none;
  }
`;

export const Mobile = styled.div`
  display: none;

  @media ${(props) => props.theme.devices.mobile} {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

export const MobileImage = styled.div`
  display: none;

  @media ${(props) => props.theme.devices.mobile} {
    display: block;
  }
`;

export const DesktopImage = styled.div`
  display: block;

  @media ${(props) => props.theme.devices.mobile} {
    display: none;
  }
`;
