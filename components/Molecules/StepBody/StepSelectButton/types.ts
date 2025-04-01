export type StepSelectButtonProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: () => void;
  button?: boolean;
  option: {
    value: string;
    label: string;
  }[];
};
