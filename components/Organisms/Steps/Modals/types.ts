import { IOrdenMail } from "../Step1/StepDni/types";

export interface ModalsProps {
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  handleChatBot?: () => void;
  data?: IOrdenMail[];
  dataUser?: any;
  valueSelect?: string | null;
}

export type CountryConfig = {
  name: string;
  areaLength: number;
};
