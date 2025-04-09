import styled from "styled-components";
import { HeroFormStyledProps } from "./types";

export const ContainerHero = styled.div<HeroFormStyledProps>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.$flexDirection};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
`;

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 404px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 20px;
  align-items: center;
`;
