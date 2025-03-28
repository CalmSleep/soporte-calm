import React from "react";
import { SeparatorProps } from "./types"
import { Styles } from "./styled"

const Separator = ({
  children,
  size,
  color,
  margin
}: SeparatorProps) => {
  return (
    <Styles
      $size={size}
      $color={color}
      $margin={margin}
    >
      {children}
    </Styles>
  );
};

export default Separator;
