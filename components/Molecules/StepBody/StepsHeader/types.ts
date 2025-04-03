export type StepHeaderProps = {
  span: string;
  title: string;
  paragraph: string;
  children?: React.PropsWithChildren<React.ReactNode>;
  value?: boolean;
  onClick?: () => void;
  button?: boolean;
};
