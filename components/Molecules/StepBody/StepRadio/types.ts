export type StepRadioProps = {
  radioOptions: { value: string; label: string }[];
  name?: string;
  checked?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};
