import styled from "styled-components";

export const PersonalizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const ConfiguratorContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 22px;
  height: 22px;
  border: 1px solid ${(props) => props.theme.colors.millionGray};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    background-color: ${(props) => props.theme.colors.yellowCalm};
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    opacity: 0;
  }

  &:checked {
    &::after {
      width: 14px;
      height: 14px;
      opacity: 1;
    }
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.yellowCalm};

    &::after {
      width: 14px;
      height: 14px;
      opacity: 1;
    }
  }
`;

export const ModuleContainer = styled.div<{
  $isOpen?: boolean;
  $hasError?: boolean;
}>`
  position: relative;
  z-index: ${(props) => (props.$hasError ? 10 : 1)};
  border: 1px solid
    ${(props) =>
      props.$hasError
        ? props.theme.colors.rareRed
        : props.$isOpen
        ? props.theme.colors.whiteEdgar
        : props.theme.colors.whiteEdgar};
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  transition: all 0.3s ease;
  transition: border-color 0.3s ease;
  ${(props) =>
    !props.$isOpen &&
    `
     cursor: pointer;
  `}

  &:hover {
    ${(props) =>
      !props.$isOpen &&
      `
     border-color: ${props.$hasError && props.theme.colors.rareRed};
    `}
    /*     transform: scale(1.002); */
    
    ${Checkbox} {
      border-color: ${(props) =>
        props.$hasError
          ? props.theme.colors.rareRed
          : props.$isOpen
          ? props.theme.colors.yellowCalm
          : props.theme.colors.paternoster};

      &::after {
        width: 14px;
        height: 14px;
        opacity: 1;
      }
    }
  }
`;

export const IconContainer = styled.div<{ $isHovered?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  border: 2px solid
    ${(props) =>
      props.$isHovered ? props.theme.colors.black : props.theme.colors.white};
  width: 42px;
  height: 42px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isHovered ? props.theme.colors.black : props.theme.colors.white};
  transition: all 0.5s ease;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

export const ConfigImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

export const ConfigImage = styled.div<{
  $isSelected: boolean;
  $isDisable?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.colors.yellowCalm
        : props.theme.colors.paternoster};
  border-radius: 8px;
  padding: 1px 0px;
  cursor: ${(props) => (props.$isDisable ? "not-allowed" : "pointer")};
  max-height: 90px;
  min-height: 90px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isDisable ? "0.5" : "1")};
  transition: all 0.3s ease;

  &:hover {
    ${(props) =>
      !props.$isSelected &&
      `
    border-color: ${props.theme.colors.millionGray};
    transition: all 0.3s ease;
    `}
  }
`;

export const PreConfigImage = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31%;
  height: 80px;
  margin: auto;
  border: 2px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.colors.yellowCalm
        : props.theme.colors.paternoster};
  border-radius: 8px;
  padding: 16px 8px;
  cursor: pointer;
  min-height: 20px;
  transition: all 0.3s ease;

  &:hover {
    ${(props) =>
      !props.$isSelected &&
      `
    border-color: ${props.theme.colors.millionGray};
    transition: all 0.3s ease;
    `}
  }
`;

export const TitleAndDelete = styled.div<{
  $isPreconfig?: boolean;
  $isOpen?: boolean;
}>`
  display: flex;
  ${(props) =>
    props.$isOpen &&
    `
     cursor: pointer;
  `}

  ${(props) =>
    props.$isPreconfig &&
    `
    flex-direction: row;
    gap: 10px;
  `}
  ${(props) =>
    !props.$isPreconfig &&
    `
    justify-content: space-between;
  `}
`;

export const TitleIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Resume = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PreConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const Text = styled.p`
  margin: 0;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const ModuleContent = styled.div<{ $isOpen?: boolean }>`
  position: relative;
  max-height: ${(props) => (props.$isOpen ? "300px" : "0")};
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  overflow: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

export const TitleToolTip = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 5px;
  position: relative;
`;

export const ToolTip = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    width: 340px;
    padding: 8px;
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    border-radius: 8px;
    font-size: 14px;
    z-index: 1000;
    text-align: center;
    display: block;
    pointer-events: none;
  }

  &:hover::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.black} transparent transparent
      transparent;
    z-index: 1001;
    pointer-events: none;
  }
`;

export const ListItem = styled.li<{
  $isLast: boolean;
  $isFirst: boolean;
  $isSelected?: boolean;
  $isDisable?: boolean;
}>`
  padding: 8px 16px;
  cursor: ${(props) => (props.$isDisable ? "not-allowed" : "pointer")};
  background-color: ${(props) =>
    props.$isDisable ? props.theme.colors.millionGray : "transparent"};
  opacity: ${(props) => (props.$isDisable ? "0.5" : "1")};

  &:hover {
    background-color: ${(props) =>
      props.$isDisable
        ? props.theme.colors.millionGray
        : props.theme.colors.coldMorning};
  }
`;

export const ErrorToolTip = styled.div`
  position: absolute;
  top: 0;
  right: 15%;
  z-index: 1000;
  pointer-events: none;
  width: max-content;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 0 0 8px;
    border-color: transparent transparent transparent
      ${(props) => props.theme.colors.white};
    z-index: 999;
  }

  &::after {
    content: attr(data-tooltip);
    position: relative;
    display: block;
    padding: 4px 8px;
    background-color: ${(props) => props.theme.colors.rareRed};
    color: ${(props) => props.theme.colors.white};
    border-radius: 4px 0 4px 4px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    z-index: 1000;
  }
`;
