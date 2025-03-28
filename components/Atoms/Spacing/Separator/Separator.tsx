import { SeparatorProps } from "./types"
import { SeparatorStyles } from "./styled"

const Separator = ({
    color,
    width,
    margin
}: SeparatorProps) => {
  return (
    <SeparatorStyles
        $color={color}
        $width={width}
        $margin={margin}
    />
  );
};

export default Separator;