import { SectionHeaderStyledProps } from "../../SectionHeader/types";

export type StepHeaderProps = {
  span: string;
  padding?: string;
  title: string;
  paragraph: string;
  children?: React.PropsWithChildren<React.ReactNode>;
  value?: boolean;
  onClick?: () => void;
  button?: boolean;
  backgroundColor?: SectionHeaderStyledProps["$backgroundColor"];
  send?: boolean;
};
