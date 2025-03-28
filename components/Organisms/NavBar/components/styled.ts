import { propagateServerField } from "next/dist/server/lib/render-server";
import styled from "styled-components";

export const NavBarWrapper = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${props => props.theme.devices.biggerMobile} {
    justify-content: space-between;
    position: relative;
    height: 45px;/* 55px */
  }
`;

export const LogoWrapper = styled.div`
  position: absolute;
  left: 30px;
  z-index: 15;

  @media ${props => props.theme.devices.biggerMobile} {
    position: relative;
    top: auto;
    left: auto;
    margin-top: 4px;
  }
`;

export const CategoryItemWrapper = styled.div<{ $active?: boolean }>`
  height: ${props => props.$active ? "0" : "fit-content"};
  opacity: ${props => props.$active ? "0" : "1"};
  visibility: ${props => props.$active ? "hidden" : "visible"};
  padding: 60px 0;
  @media ${props => props.theme.devices.biggerMobile} {
    padding: 0;
  }
`;

export const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.millionGray};
  cursor: pointer;
`;

export const CategoryItemTitle = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;  
  margin: 0 20px;
  @media ${props => props.theme.devices.biggerMobile} {
    justify-content: space-between;
    margin: 0;
  }
`;

export const MenuWrapperMobile = styled.div<{ $isMenuOpen?: boolean }>`
  display: none;
  z-index: 25;
  flex-direction: row;
  list-style-type: none;
  flex-wrap: wrap;
  white-space: nowrap;
  transition: all 0.1s ease-in;
  font-size: 1em;
  justify-content: center;
  margin: 0;
  color: ${props => props.theme.colors.black};

  @media ${props => props.theme.devices.biggerMobile} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: transform 0.7s ease-in-out;
    width: 100%;
    transform: ${props => (props.$isMenuOpen ? "translate(0)" : "translate(-150%)")};
    position: fixed;
    top: 100px;
    background-color: ${props => props.theme.colors.white};
    height: 90vh; 
    max-height: 90vh;
    overflow-y: hidden; 
    padding-bottom: 10px;
    box-sizing: border-box;
  }

  & > div {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 100%; 
    width: 100%;
  }
`;


export const RowItemMobile = styled.div`
  height: 5em;
  align-items: center;

`;

export const MenuWrapperDesktop = styled.div`
  z-index: 25;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  flex-wrap: wrap;
  white-space: nowrap;
  transition: all .6s ease-in;
  font-size: 1em;
  justify-content: center;
  margin: 0;
  color: ${props => props.theme.colors.black};

  @media ${props => props.theme.devices.biggerMobile} {
    display: none;
  }
`;

export const MobileMenuIconWrapper = styled.div`
 display: none;

  @media ${props => props.theme.devices.biggerMobile} {
    display: block;
    margin: 0 10px;
    cursor: pointer;
  }
`;



export const NavigationDropDown = styled.div<{ $active: boolean, $isFeria?: boolean, $hasThreeRows?: boolean }>`
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: ${props => props.theme.colors.white};
  width: 100%;
  height: ${props => props.$hasThreeRows ? '450px' : '350px'};
  position: absolute;
  top: ${props => props.$isFeria ? "44px" : "108px"};
  left: 0%;
  opacity: ${props => props.$active ? "1" : "0"};
  visibility: ${props => props.$active ? "visible" : "hidden"};
  ${props => props.$active && "transform: translateY(10px);"}   
  transition: all .3s ease-in;
  box-sizing: border-box;
  @media ${props => props.theme.devices.biggerMobile} {
    height: ${props => props.$active ? "auto" : "0"};
    ${props => props.$active && "margin-bottom: 20px;"};
    transform: none;
    top: 0px;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    transition: none;
    overflow-y: auto;
  }
`;

export const DropdownContainer = styled.div`
  height: 100%;
`

export const CategoryItemContainer = styled.div`
  margin: 1.5em;
  width: 45%;
`;
export const ProductsColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
  justify-content: center;
  width: 65%;
`
export const ProductsColumnContainerMobile = styled.div`
  width: 100%;
`
export const ProductsColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
    
    @media ${props => props.theme.devices.biggerMobile} {
      padding-left: 0px;
      padding-top: 0.5em;
      flex-direction: column;
      width: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
`;

export const ProductsContainerMobile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 20px;
  width: 100%;
`
export const ImageAndTitleContainerMobile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;

  p{
    line-height: inherit;
  }
`

export const ProductContainer = styled.div`
  a {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  padding: 10px;
  span {
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      max-width: 100%;
  }
  svg {
    color: ${props => props.theme.colors.black};
  }
  @media ${props => props.theme.devices.middleResolutionDesktop} {

    &:hover {
        background-color: ${props => props.theme.colors.icedAlmond};
        border-radius: 5px;
      }
    a:hover { 
      color: ${props => props.theme.colors.brilliantLiquorice};
      }
    }
  @media ${props => props.theme.devices.biggerMobile} {
    margin: 0;
    margin-left: 20px;
    padding: 0;
    gap: 0;
    justify-content: space-between;    
    }
    p {
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      max-width: 100%;
    }
  }
`

export const ProductsWrapperContainerMobile = styled.div`
/*   display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin: 10px 0;
  padding-right: 20px;
  box-sizing: border-box; */
    @media ${props => props.theme.devices.biggerMobile} {
      width: 100%;
      height: 100%;
      margin: 0;
      -webkit-overflow-scrolling: touch;
    }
`;

export const ChildProducstWrapperMobile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  padding-right: 20px;
  box-sizing: border-box;
  @media ${props => props.theme.devices.biggerMobile} {
    height: 650px;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
`

export const WhiteDiv = styled.div`
  padding: 50px 0;
  background-color: ${props => props.theme.colors.whiteEdgar};
  -webkit-overflow-scrolling: touch;
`

export const WhiteSpace = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
`


export const ProductsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin: 10px 0;
  padding: 0 10px;
  box-sizing: border-box;
    @media ${props => props.theme.devices.biggerMobile} {
      width: 100%;
      margin: 0;
      padding: 0;
    }
`;

export const HeaderProducts = styled.div<{ $isSofa?:boolean, $isSofaMobile?:boolean }>`
  p {
      margin-left: ${props => props.$isSofa ? '10px' : '20px'};
  }
  height: 2em;
  @media ${props => props.theme.devices.biggerMobile} {
    margin: 10px 0 0 20px;
    height: ${props => props.$isSofa ? "0em" : "1em"};
    margin-top: ${props => props.$isSofa ? "-1em" : ""};
    margin-bottom: ${props => props.$isSofaMobile ? "20px" : ""};
    p {
      margin-left: 0px;
    }
  }
`

export const FooterProducts = styled.div`
  height: 2em;
  padding-left: 20px;
  @media ${props => props.theme.devices.biggerMobile} {
    margin: 0 0 10px 20px;
    height: 1em;
  }
    @media ${props => props.theme.devices.middleResolutionDesktop} {
      a:hover {
        font-weight: ${props => props.theme.fonts.bold};
      }
    }
`
export const ImagesColumn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 1em;
  background-color: ${props => props.theme.colors.whiteEdgar};
  width: 35%;
  height: 100%;
  > * {
      width: 50%;
    }
  @media ${props => props.theme.devices.biggerMobile} {
    flex-direction: row;
    width: 100vw;
    align-items: flex-start;
    > * {
      width: 50%;
    }
  }

`;

export const CardImage = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 5px;
  p {
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      max-width: 100%;
      min-height: 3em;
    }

  @media ${props => props.theme.devices.biggerMobile} {
    p {
      max-width: 80%;
    }
  }
  div a {
      min-height: 2em;
    }
`;


export const CartAndLandingsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  margin-right: 15px;

  @media ${props => props.theme.devices.biggerMobile} {
    position: relative;
  }
`;

export const LandingsWrapperDesktop = styled.div`
  display: flex;

  @media ${props => props.theme.devices.biggerMobile} {
    display: none;
  }
`;

export const LandingsWrapperMobile = styled.div<{ $active?: boolean }>`
    display: none;
  @media ${props => props.theme.devices.biggerMobile} {
    display: flex;
    visibility: ${props => props.$active ? "hidden" : "visible"};
    opacity: ${props => props.$active ? "0" : "1"};
    flex-direction: column;
    border-top: 1px solid ${props => props.theme.colors.explosiveGray};
    margin-top: 4px;
    padding-top: 8px;
    padding-left: 20px;
  }
`;

export const CartWrapper = styled.div`
  display: flex;
  margin-left: 30px;
  cursor: pointer;
  position: relative;
  @media ${props => props.theme.devices.biggerMobile} {
    margin: 0 20px;
  }
`;

export const ProductWrapper = styled.div`
  width: 85%;
a {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all .1s ease-in-out;
  }
  @media ${props => props.theme.devices.biggerMobile} {
    font-size: 1.2em;
    margin: 5px 0;
    width: 100%;

  }
`;

export const Pill = styled.span<{$isYellowPill?: boolean}>`
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$isYellowPill ? props.theme.colors.icedAlmond : props.theme.colors.wildCaribbeanGreen};
  text-transform: none;
  color: ${props => props.$isYellowPill ? props.theme.colors.yellowCalm : props.theme.colors.starshipTrooper};
  border-radius: 6px;
  padding: 5px 8px;
  font-size: .7em;
  width: fit-content;

  &:hover {
      color: ${props => props.$isYellowPill ? props.theme.colors.yellowCalm : props.theme.colors.starshipTrooper} !important;
  }

  @media ${props => props.theme.devices.biggerMobile} {
    margin: 0;
  }
`;

export const SelectedProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartNumber = styled.div<{$disabled?: boolean}>`
  position: absolute;
  display: ${props => props.$disabled ? "none" : "flex"};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.yellowCalm};
  left: 50%;
  bottom: 40%;
  width: 15px;
  height: 15px;
`;

/* export const QuizzContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
  gap: 10px;
  margin-top: -5px;
    @media ${props => props.theme.devices.biggerMobile} {
      margin: 5px 5px;
      flex-direction: column;

    }
` */

export const QuizzContainer = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 5px;
  p {
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      max-width: 100%;
    }
  @media ${props => props.theme.devices.biggerMobile} {
    p {
      max-width: 80%;
    }
  }
`;