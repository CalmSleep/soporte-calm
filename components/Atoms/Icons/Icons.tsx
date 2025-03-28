import { IconStyles } from "./styled";
import { IconsProps } from "./types"

const Icons = ({
  children,
  width,
  height,
  padding,
  responsiveMobile,
  onClick,
  isCenter
}: IconsProps) => {
  return (
    <IconStyles
    onClick={onClick}
    $width={width}
    $padding={padding}
    $height={height}
    $isCenter={isCenter}
    $responsiveMobile={responsiveMobile}
    >
      {children}
    </IconStyles>
  );
};

export default Icons;