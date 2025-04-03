export type StepHeaderProps = {
  span: string;
  title: string;
  paragraph: string;
  children?: React.PropsWithChildren<React.ReactNode>;
  value?: string;
  onClick?: () => void;
  button?: boolean;
};
