import styled from "styled-components";
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

export const Inner = styled.div`
  position: absolute;
  font-family: ${(props) => props.theme.fonts.regular}, "Arial";
  > b {
    font-family: ${(props) => props.theme.fonts.extraBold}, "Arial";
  }
  a {
    cursor: pointer;
  }
`;

export const ContaineritemsSelect = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: ${({ $isOpen }) =>
    $isOpen ? "1000px" : "0"}; /* valor grande pero seguro */
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

export const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivIconPlus = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

interface ImgRotateProps {
  $isActive?: boolean;
}

export const ImgRotate = styled.div<ImgRotateProps>`
  transform: rotate(${(props) => (props.$isActive ? -180 : 0)}deg);
  transition: all 0.2s;
`;
interface ImgStaticProps {
  $isActive?: boolean;
}

export const ImgStatic = styled.div<ImgStaticProps>`
  float: right;
`;

export const Content = styled.div<{
  $isActive?: boolean;
  $itemName: string;
  $render?: boolean;
}>`
  position: relative;
  overflow: hidden;
  transition: height 0.5s;
  height: 0;
  height: ${(props) => {
    if (props.$render) {
      const inner = document.getElementById(props.$itemName);
      return `${props.$isActive && inner ? inner.scrollHeight : 0}px`;
    }
  }};
`;

export const DivContainerAccordion = styled.div<{
  $isLastUnit?: boolean;
  $descriptionCamaOla?: boolean;
  $backgroundColor?: ThemeColors;
}>`
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: ${(props) => `${props.theme.colors.lead}40`};
  ${(props) => props.$isLastUnit && "border-radius: 10px;"}
  &:last-child {
    border-style: ${(props) => (props.$descriptionCamaOla ? "solid" : "none")};
  }
  background-color: ${(props) =>
    props.$backgroundColor ? props.theme.colors[props.$backgroundColor] : ""};
`;

export const DivTitleAccordion = styled.div<{ $descriptionCamaOla?: boolean }>`
  padding: 1rem 1.2rem;
  cursor: pointer;
  @media ${(props) => props.theme.devices.mobile} {
    padding: ${(props) =>
      props.$descriptionCamaOla ? "1rem 0" : "1rem 1.2rem"};
  }
`;

export const DivTextAccordion = styled.div`
  color: ${(props) => props.theme.colors.offBlack};
  font-family: ${(props) => props.theme.fonts.light}, Arial;
  font-size: 0.8em;
`;

export const DescriptionAccordion = styled.div<{
  $isProductSS?: boolean;
  $isFromCapas?: boolean;
  $descriptionCamaOla?: boolean;
}>`
  height: 100%;
  transition: all 0.35s;
  padding-top: 10px;
  line-height: 1.5;
  font-weight: 300;
  border-top: solid;
  border-width: 1px 0px 0px 0px;
  border-color: ${(props) => `${props.theme.colors.lead}40`};
  a {
    text-decoration: none;
    color: ${theme.colors.yellowCalm};
    font-family: ${(props) => props.theme.fonts.light}, Arial;
    font-size: 1.1rem;
  }
  b {
    font-family: ${(props) => props.theme.fonts.extraBold}, Arial;
  }
  p {
    color: ${(props) =>
      props.$isProductSS
        ? `${theme.colors.offBlack}`
        : ($props) =>
            $props.$descriptionCamaOla ? props.theme.colors.lead : ""};
    font-family: ${(props) => props.theme.fonts.medium}, Arial;
    padding: 5px 20px 20px 20px;
    font-size: ${(props) => (props.$isProductSS ? `1rem` : "")};
    font-family: ${(props) =>
      props.$descriptionCamaOla ? props.theme.fonts.light : ""};
    line-height: ${(props) => (props.$descriptionCamaOla ? "130%" : "")};
    letter-spacing: ${(props) => (props.$descriptionCamaOla ? "130%" : "")};
  }
  ul {
    list-style-type: circle;
    color: ${(props) =>
      props.$isProductSS
        ? `${theme.colors.offBlack}`
        : props.theme.colors.millionGray};
    font-family: ${(props) => props.theme.fonts.light}, Arial;
    font-size: ${(props) => (props.$isProductSS ? `1rem` : "")};
    margin-left: 2rem;
  }

  @media ${(props) => props.theme.devices.mobile} {
    p {
      font-size: ${(props) =>
        props.$isFromCapas ? `.9rem` : props.$isProductSS ? `.8rem` : ""};
    }
    ul {
      font-size: ${(props) =>
        props.$isFromCapas ? `.9rem` : props.$isProductSS ? `.8rem` : ""};
    }
  }
`;

export const SubtitleAccordion = styled.h5`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.brilliantLiquorice};
  line-height: 130%;
  letter-spacing: -0.72px;
  padding: 10px 0 0 0;
`;
export const IconTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media ${(props) => props.theme.devices.biggerMobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ContentItemSelect = styled.div<{
  $isActive?: boolean;
  $contentHeight: number;
}>`
  overflow-x: hidden;
  overflow-y: visible;
  transition: max-height 0.5s ease;
  transition: height 0.3s ease;
  max-height: ${({ $isActive }) => ($isActive ? `100%` : "0")};
`;
