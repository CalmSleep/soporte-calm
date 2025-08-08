import React from 'react';
import { ToolTip } from './styled';

interface TooltipProps {
  text?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, disabled = false }) => {
  if (disabled || !text) {
    return <>{children}</>;
  }

  return (
    <ToolTip data-tooltip={text}>
      {children}
    </ToolTip>
  );
};

export default Tooltip; 