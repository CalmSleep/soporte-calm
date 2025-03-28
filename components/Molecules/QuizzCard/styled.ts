import styled from "styled-components";

export const Container = styled.div<{ $isfromNavBar?: boolean }>`
  position: relative;
  margin: ${props => props.$isfromNavBar ? "0" : "0.4rem 0.4rem 2rem 0.4rem"};
  display: inline-table;
  width: ${props => props.$isfromNavBar ? "auto" : "280px"}; 
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${props => props.$isfromNavBar ? '5px' : '10px'};
  @media ${props=>props.theme.devices.mobile} {
    width: auto;
  }

`;

export const ImageContainer = styled.div<{ $isfromNavBar?: boolean }>`
  display: block;
  @media ${props=>props.theme.devices.mobile} {
    display: ${props => props.$isfromNavBar ? 'block' : 'none'} ;
    margin-bottom: ${props => props.$isfromNavBar ? '5px' : 'none'} ;

  }
`

export const TextQuizzContainer = styled.div`

`

export const CardImage = styled.div`
  padding: 0 1em 1em 1em;
  p {
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      max-width: 100%;
    }
  @media ${props => props.theme.devices.biggerMobile} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    p {
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      max-width: 80%;
    }
  }
`;