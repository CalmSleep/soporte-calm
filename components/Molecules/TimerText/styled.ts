import styled from "styled-components";

export const Container = styled.div<{ $isBannerPromos?: boolean}>`
    width: ${props => props.$isBannerPromos ? "76px" : "30px"};

    ${props => props.$isBannerPromos && `
        display: flex;
        padding: 12px 18px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
        border-radius: 8px;
        background: ${props.theme.colors.drWhite};
    `}

    @media ${props => props.theme.devices.mobile} {
        ${props => props.$isBannerPromos ? "66px" : "66px"};
    }
`;
