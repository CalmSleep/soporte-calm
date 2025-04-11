import React from "react";

export type ModalStepsProps = {
  title?: string;
  paragraph?: string;
  clicHere?: boolean;
  clicText?: string;
  clicText2?: string;
  buttonText?: string;
  onClick?: () => void;
  handleClose?: () => void;
  children?: React.ReactNode;
};
