import { MarginProps } from "./types"
import { MarginStyles } from "./styled"

const Margin = ({
  children,
  margin,
  marginMobile,
  marginBiggerDesktop,
}: MarginProps) => {
  return (
    <MarginStyles
      $margin={margin}
      $marginMobile={marginMobile}
      $marginBiggerDesktop={marginBiggerDesktop}
    >
      {children}
    </MarginStyles>
  );
};

export default Margin;