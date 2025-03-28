import { TypographyProps } from "./types"
import { TypographyStyled, Bold } from "./styled"

const Titles = ({
  titleTag = "h1",
  font,
  color,
  fontSize,
  align,
  fontWeight,
  children,
  responsiveMobile,
  width,
  boldTitle,
  lineHeight,
  textShadow,
  textStroke,
  letterSpacing,
  hasStrong,
  textDecoration
}: TypographyProps) => {
  return (
    <TypographyStyled
      as={titleTag}
      $align={align}
      $hasStrong={hasStrong}
      $fontSize={fontSize}
      $textDecoration={textDecoration}
      $font={font}
      $width={width}
      $color={color}
      $textShadow={textShadow}
      $responsiveMobile={responsiveMobile}
      $lineHeight={lineHeight}
      $textStroke={textStroke}
      $letterSpacing={letterSpacing}
      $fontWeight={fontWeight}
    >
      {children} { boldTitle && <Bold>{boldTitle}</Bold>}
    </TypographyStyled>
  );
};

export default Titles;