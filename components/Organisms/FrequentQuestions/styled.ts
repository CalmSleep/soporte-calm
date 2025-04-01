import styled from "styled-components";
import { theme } from "@/utils/Theme";


export const DivContainer = styled.section<{$noBackgroundColor?: boolean, $pageRdc?: boolean}>`
background-color: ${props => props.$noBackgroundColor ? theme.colors.transparentCalm : theme.colors.ZZBPearl};
  text-align: center;
  padding: 2em 0;
  @media ${theme.devices.mobile} {
    padding: 0.8em 0;
  }
`;

export const DivAccordion = styled.div`
  width: 75%;
  margin: auto;
  text-align: left;

  @media ${theme.devices.mobile} {
    width: 90%;
  }
`;
export const DivAccordionUnit = styled.section<{$isProductSS?: boolean, $noBackgroundColor?: boolean}>`
  overflow: hidden;
  width:  ${props => props.$isProductSS ? "100%" : "80%"};
  margin: 10px auto;
  text-align: left;
  background-color: ${props => props.$noBackgroundColor ? theme.colors.transparentCalm : theme.colors.ZZBPearl};
  border-radius: 10px;
  box-shadow: 0 0 0 0 rgba(0,0,0,.5);
  @media ${theme.devices.mobile} {
    border-style: none;
    width: 100%;
  }
`;