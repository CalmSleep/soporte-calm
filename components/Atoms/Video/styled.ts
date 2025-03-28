import styled from "styled-components";
import { VideoStyledProps } from "./types"

export const Iframe = styled.iframe<VideoStyledProps>`
  width: ${props => props.$width ? props.$width : "100%"};
  max-width: 100%;
  height: ${props => props.$height ? props.$height : "436px"};
  border-radius: ${props => props.$borderRadius ? props.$borderRadius : "10px"};

@media (max-width: 768px) {
  height: 300px;
}
@media (min-width: 998px) {
  height: 576px;
}
@media (max-width: 698px) {
  height: 210px;
}
`;

export const Mp4 = styled.video<VideoStyledProps>`
  width: ${props => props.$width ? props.$width : "100%"};
  height: ${props => props.$height ? props.$height : "auto"};
  border-radius: ${props => props.$borderRadius ? props.$borderRadius : "10px"};
  object-fit: ${({ $objectFit }) => $objectFit};
`;