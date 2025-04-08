export type Step3Props = {
  valueSelect: string | null;
};
export interface Step3Select1Props {
  selectedValue: string | null;
  handleOnchangeWithoutConfirm: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleCheckboxChange: (isChecked: boolean, title: string) => void;
  handleCheckboxChangeConfirmed: (isChecked: boolean, title: string) => void;
  selectedTitles: string[];
  handleEditCheckbox: () => void;
  checkboxConfirmed: boolean;
  valueSelect: string | null;
  handlePaymentChange?: (
    paymentLabel: string,
    payments: { value: string; label: string }[]
  ) => void;
}

export interface SelectOptionProps {
  selectedValue?: string | null;
  onCheckboxChange: (isChecked: boolean, title: string) => void;
  handlePaymentChange?: (
    paymentLabel: string,
    payments: { value: string; label: string }[]
  ) => void;
}

export interface Step3Select2Props {
  checkboxConfirmed: boolean;
  selectedTitles: string[];
  handleEditCheckbox: () => void;
  handleCheckboxChange: (isChecked: boolean, title: string) => void;
}
