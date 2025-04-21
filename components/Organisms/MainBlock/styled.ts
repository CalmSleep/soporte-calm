import styled from 'styled-components';

export const LandingContent = styled.div`
  padding: 10px 5px;
  width: 97%;
  margin: auto;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0px;
    width: 100%;
  }

  @media ${(props) => props.theme.devices.middleResolutionDesktop} {
    max-width: 1350px;
    margin: auto;
  }
`

export const Wrapper = styled.div`
  max-width: 1350px;
  display:  "flex";
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;

  @media ${({ theme }) => theme.devices.mobile} {
    margin: auto;
    width: 100%;
    gap: 10px;
  }
`
export const DivShowText = styled.div`
padding: 0 auto;
cursor: pointer;
margin: 10px 0 0 0;
`

export const Adopt = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  gap: 20px;
`

export const Loaders = styled.div`
  margin: 30px 0;
  display: flex;
  gap: 20px;

  @media ${({ theme }) => theme.devices.mobile} {
    margin: 0;
    flex-direction: column;
  }
`

export const SpanColumns = styled.span`
  display: flex;
  gap: 1.6rem;
  @media ${({ theme }) => theme.devices.mobile} {
    gap: 0.5rem;
    flex-direction: column;
    margin: auto;
  }
`

export const MainContentWrapper = styled.section`
  margin: auto;
`

export const Breadcrumbs = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 5px;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 65%;
  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
  }
`

export const GalleryWrapper = styled.div`
  position: relative;
`

export const RightColumn = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${(props) => props.theme.devices.mobile} {
    width: 94%;
    margin: 0px auto 20px auto;
    overflow-y: initial;
    height: initial;
  }
`

export const ImagePromo = styled.div`
  @media ${(props) => props.theme.devices.mobile} {
   display: none;
  }
`

export const PillCategoryDiscount = styled.div`
  color: white;
  background-color: ${(props) => props.theme.colors.offBlack};
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.8px;
  grid-column: 1/3;
  grid-row: 2/3;
  border-radius: 50px;
  width: fit-content;
  padding: 0.2rem 0.5rem;
`

export const ButtonInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;

  @media ${(props) => props.theme.devices.mobile} {
    gap: 5px;
  }
`

export const AdoptButton = styled.a`
  background-color: ${props => props.theme.colors.white};
  width: 100%;
  border-radius: 641.649px;
  font-family: ${props => props.theme.fonts.bold};
  height: 60px;
  font-size: 1rem;
  color: ${props => props.theme.colors.wildViolet};
  display: flex;
  justify-content: center;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.colors.workoutRoutine};
  }
`

export const ContainerPaymentMethod = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`

export const DivTitlePills = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
`

export const MiniBannerMobile = styled.div`
  display: none;
  
  @media ${(props) => props.theme.devices.mobile} {
    display: block;
  }
`
export const AtcQuantity = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  margin: 7px auto;
`

export const ATCButton = styled.div<{ $hasQuantity?: boolean}>`
 width: ${props => props.$hasQuantity ? "70%" : "100%"};
`

export const Arrow = styled.div<{ $isOpen?: boolean }>`
  transition: transform 0.1s ease;
  transform: rotate(${props => (props.$isOpen ? '180deg' : '0deg')});
  pointer-events: none;
  margin-bottom: 4px;

  @media ${(props) => props.theme.devices.mobile} {
    margin-right: 10px;
  }
`;


export const DropdownContainer = styled.div<{ $isSize?: boolean }>`
  position: relative;
  min-width: 50px;
  width: ${props => props.$isSize ? "100%" : "30%"};
  height: ${props => props.$isSize ? "50px" : "100%"};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  color: ${(props) => props.theme.colors.lead};
  line-height: 130%;
  letter-spacing: -0.48px;
  border-radius: ${props => props.$isSize ? "16px" : "82px"};
  border: 1px solid ${(props) => props.theme.colors.paternoster};
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: ${props => props.$isSize ? "space-between" : "space-evenly"};
  align-items: center;

  ${props => props.$isSize &&
  `padding: 0 12px;`}

  @media ${(props) => props.theme.devices.mobile} {
    align-items: center;
    height: 55px;
  }
`;

export const DropdownHeader = styled.div`

`;

export const DropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 15;
  top: 100%;
  left: 0%;
`;

export const DropdownList = styled.ul`
  list-style: none;
  padding: 10px 10px;
  margin: 5px 0 0 0;
  background-color: white;
  border: 1.398px solid ${(props) => props.theme.colors.paternoster};
  border-radius: 18px;
  overflow-y: auto;
`;

export const ListItem = styled.li<{ $isLast: boolean, $isFirst: boolean, $isSelected?: boolean, $isDisable?: boolean }>`
  padding: 10px;
  cursor: ${props => props.$isDisable ? "not-allowed" : "cursor"};
  width: 100%;
  border-radius: 5.592px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.$isDisable ?
  `background-color: ${props.theme.colors.rareRed};`
  : props.$isSelected &&
  `background-color: ${props.theme.colors.whiteEdgar};`}

  ${props => props.$isFirst &&
  `margin: 5px 0 0 0;`}

  ${props => props.$isLast &&
  `margin: 0 0 5px 0;`}

  &:hover {
    ${props => !props.$isDisable &&
    `background-color: ${props.theme.colors.whiteEdgar};`}
  }
`;

export const Chat = styled.div`
  #notchatbot-disclaimer {
    font-size: 12px;
    font-style: italic;
    line-height: 130%;
    letter-spacing: "-0.36px";
    color: ${props => props.theme.colors.brilliantLiquorice};
  }
  #embedchatDesktop {
    border: none;
    #embedchat {
      height: 200px;
      max-height: 200px;
      border: none;
    } 
    .flex.items-start.gap-1 {
      gap: 13px !important;
    }
    .relative.flex.shrink-0.overflow-hidden.rounded-full.h-6.w-6 {
      width: 34px;
      height: 34px;
    }
    div form div input {
      font-size: 0.875rem;
    }
    #notchatbot-embedchat-disclaimer {
      margin: 3px 0;
    }
  }

  #embedchatMobile {
    #embedchat {
      margin-top: 20px;
      height: 200px;
      max-height: 200px;
      border: none;
    }
    .flex.items-start.gap-1 {
      gap: 13px !important;
    }
    .relative.flex.shrink-0.overflow-hidden.rounded-full.h-6.w-6 {
      width: 34px;
      height: 34px;
    }
    div form div input {
      font-size: 16px;
    }
    #notchatbot-embedchat-disclaimer {
      margin: 3px 0;
    }
  }

  div div {
    border: none !important;
    padding: 0 !important;
  }

  @media ${(props) => props.theme.devices.mobile} {
    #notchatbot-disclaimer {
      font-size: 10px;
    }
  }
`