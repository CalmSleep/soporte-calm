import styled from "styled-components";
import { HeroFormStyledProps } from "./types";

export const ContainerHero = styled.div<HeroFormStyledProps>`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
`;
