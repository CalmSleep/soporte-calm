import styled from "styled-components";

export const DivHeader = styled.div<{$colorBg?: string}>`
        background-color:  ${props => props.theme.colors.lead};
        color: ${props => props.theme.colors.white};
        text-align: center;
        padding: 5px 8px;
        font-size: 12px;
`