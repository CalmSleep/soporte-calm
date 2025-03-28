import { styled } from 'styled-components'
import { theme } from "@/utils/Theme";

type ThemeColors = keyof typeof theme.colors;

export const StyledButton = styled.button<{ $active: boolean, $borderColor?: ThemeColors}>`
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  border-radius: 8px;
  max-height: 51px;
  padding: 18px;
  outline: none;
  border: 2px solid ${({ $borderColor, theme }) =>
  $borderColor ? theme.colors[$borderColor] : "gray"};
  background-color: ${({ theme }) => theme.colors.white};



  svg:last-child {
    margin-left: auto;
    transform: ${({ $active }) =>
      $active ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.2s;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.yellowCalm};
    };
`
