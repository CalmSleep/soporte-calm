import styled from "styled-components";
import { CountdownStyles } from "./types"

export const Container = styled.div<CountdownStyles>`
  padding: ${props => props.$isHeadbanner ? "0 0 0 5px" : "7px 6px"};
  visibility: ${props => props.$show ? "visible" : "hidden"};
  display: flex;
  justify-content: ${props => props.$isBannerPromos ? "flex-start" : "center"}; 
  align-items: center;
  padding-top: 2px;
  ${props => props.$isBannerPromos && `gap: 10px;`}
  
  @media ${props=>props.theme.devices.mobile}{
    margin: auto;
  }
`;