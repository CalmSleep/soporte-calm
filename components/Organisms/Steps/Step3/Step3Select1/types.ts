export interface Step3Select1Props {
  selectedValue: string | null;
  handleOnchangeWithoutConfirm: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleCheckboxChange: (isChecked: boolean) => void;
}

export interface Select1OptionProps {
  onCheckboxChange: (isChecked: boolean) => void;
}
