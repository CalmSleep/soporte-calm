export type HandleViewProps = {
  handlePreconfigView: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  isNewModal?: boolean;
  disabled?: boolean;
  tooltip?: string;
  hoverIcon?: React.ReactNode;
};
