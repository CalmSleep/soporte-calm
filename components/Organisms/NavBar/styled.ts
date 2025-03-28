import styled, { css, keyframes } from 'styled-components';

const showAnimationHeadBanner = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const hideAnimationHeadBanner = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const upperNavbar = keyframes`
  0% {
    top: -1px;
  }
  100% {
    top: -25px;
  }
`;

const downNavbar = keyframes`
  0% {
    top: -25px;
  }
  100% {
    top: -1px;
  }
`;

export const NavBarWrapper = styled.div<{ $show?: boolean, $isLoading?: boolean, $upper?: boolean }>`
  z-index: 19;
  position: sticky;
  top: -1px;
  display: ${({ $show }) => ($show ? 'block' : 'none')};


  ${({ $upper }) => (
     $upper
    ?  css`animation: ${upperNavbar} 0.3s ease-in-out forwards; `
    : css`animation: ${downNavbar} 0.3s ease-in-out forwards;` )};
  

  @media ${props => props.theme.devices.mobile} {
    height: 100px;
  }
`;

export const MenuWrapper = styled.div`
    background-color:  ${props => props.theme.colors.white};
    z-index: 1;
`;

export const HeadBannerContent = styled.div<{ $show?: boolean, $showAnimation?: boolean }>`
  min-height: 25px;
  background-color: ${props => props.theme.colors.madForMango};
  display: flex;

  ${({ $show, $showAnimation }) => ( $showAnimation && (
     $show
    ?  css`animation: ${hideAnimationHeadBanner} 0.3s ease-in-out forwards; `
    : css`animation: ${showAnimationHeadBanner} 0.3s ease-in-out forwards;` ))};
`;

export const ScrolNavBar = styled.div<{$visible?: boolean}>`
  @media ${props => props.theme.devices.mobile} {
    top: 0;
    transition: transform 0.3s ease-in-out;
    transform: translateY(${props => (!props.$visible ? '-100%' : '0')});
  }
`