import { StepRadioProps } from "../StepRadio/types";

export interface IChecks {
  id: string;
  name: string;
  value: string;
  title: string;
  span?: string;
}

export interface IItems {
  id: string;
  title: string;
  pieces: { label: string; hasInput?: boolean; placeholder?: string }[];
}

export type StepSelectsProps = {
  titleParagraph?: string;
  checks?: IChecks[];
  items?: IItems[];
  radioOptions?: StepRadioProps["radioOptions"];
  onCheckboxChange?: (isChecked: boolean, title: string) => void;
  selectedOption?: string;
  setSelectedOption?: React.Dispatch<React.SetStateAction<string>>;
};
