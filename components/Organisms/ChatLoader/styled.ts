import { theme } from "@/utils/Theme";
import styled, { css } from "styled-components";

export const ChatImage = styled.div<{ $isMenuOpen: boolean | undefined, $toBottom: boolean | undefined, $isProduct: boolean | undefined, $isCheckout: boolean | undefined, $openCheckoutChat: boolean | undefined }>`
    position: fixed;
    bottom: 0px;
    right: 2px;
    background-color: #F5A203;
    border-radius: 50%;
    width: 66px;
    height: 66px;
    display: ${ props => props.$isMenuOpen ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1000;

    @media ${theme.devices.biggerMobile} {
        ${ props => props.$toBottom ? css`
        bottom: 0;
        transition: bottom 0.4s ease;
    ` : props.$isProduct ? css`
        bottom: 155px;
        transition: bottom 0.4s ease;
    ` : css`
        bottom: 0;
        transition: bottom 0.4s ease;
    `}
    ${ props => props.$isCheckout ? (
        props.$openCheckoutChat ? css`
            bottom: 0;
            transition: bottom 0.4s ease;
            display: flex;
        ` : css`
            display: none;
        `
    ) : ''}
  }
`
