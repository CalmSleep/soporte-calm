import { theme } from "@/utils/Theme";
import React from "react";

type ThemeColors = keyof typeof theme.colors;

export interface IArrayButton {
  id: number;
  text: string;
  backgroundColor: ThemeColors;
  onClick: () => void;
}

export type ModalStepsProps = {
  title?: string;
  paragraph?: string | JSX.Element;
  clicHere?: boolean;
  clicText?: string;
  clicText2?: string;
  buttonText?: string;
  onClick?: () => void;
  handleClose?: () => void;
  children?: React.ReactNode;
  modalDevChange?: boolean;
  arrayButton?: IArrayButton[];
  icon?: boolean;
  productsLoading?: boolean;
};
