import React from "react";

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
};
