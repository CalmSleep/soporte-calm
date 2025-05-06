import React, { Dispatch } from "react";
import { DniInput, EmailInput, IOrdenMail } from "../Step1/StepDni/types";
import { set } from "date-fns";

export interface ModalsProps {
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  handleChatBot?: (mensaje: string) => void;
  data?: IOrdenMail[];
  dataUser?: any;
  valueSelect?: string | null;
  setInputValue?: React.Dispatch<React.SetStateAction<DniInput>>;
  dispatch?: Dispatch<any>;
}

export type CountryConfig = {
  name: string;
  areaLength: number;
};
