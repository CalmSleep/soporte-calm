import { IgetProducts, IProduct } from "@/state/products/types";
import { StepRadioProps } from "../StepRadio/types";

export interface IChecks {
  id: string;
  name?: string;
  value: string;
  title: string;
  span?: string;
}

export interface IItems {
  id: string;
  title: string;
  pieces: { label: string; hasInput?: boolean; placeholder?: string }[];
  span?: string;
}

export type StepSelectsProps = {
  titleParagraph?: string;
  checks?: IChecks[];
  items?: IItems[];
  products?: IgetProducts[];
  itemsProducts?: React.ReactNode;
  menuData?: any;
  radioOptions?: StepRadioProps["radioOptions"];
  onCheckboxChange?: (
    isChecked: boolean,
    title: string,
    radioGroup?: string[]
  ) => void;
  selectedOption?: string;
  setSelectedOption?: React.Dispatch<React.SetStateAction<string>>;
  changedOption?: boolean;
  selectedTitle?: string[];
  idVariation?: number[];
  setIdVariation?: React.Dispatch<React.SetStateAction<number[]>>;
};
