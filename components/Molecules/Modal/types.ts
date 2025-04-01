import React from "react";

export type ModalStepsProps = {
  open?: boolean | (() => void);
  setModal?: (open: boolean) => void;
  title?: string;
  paragraph?: string;
  clicHere?: boolean;
  clicText?: string;
  clicText2?: string;
  buttonText?: string;
  onClick?: () => void;
};
