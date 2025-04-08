export interface Step3Select1Props {
  selectedValue: string | null;
  handleOnchangeWithoutConfirm: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleCheckboxChange: (isChecked: boolean, title: string) => void;
  selectedTitles: string[];
  handleEditCheckbox: () => void;
  checkboxConfirmed: boolean;
  handleClickAcordion: (title: string) => void;
  valueSelect: string | null;
}

export interface SelectOptionProps {
  onCheckboxChange: (isChecked: boolean, title: string) => void;
  handleClickAcordion?: (title: string) => void;
}
