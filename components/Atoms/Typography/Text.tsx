import { TypographyProps } from "./types";
import { TypographyStyled, LinkStyled } from "./styled";
import { useRouter } from "next/router";
import {
  onRedirectLoadingStart,
  onRedirectLoadingFinished,
} from "@/state/loading/loadingActions";
import { useDispatch } from "react-redux";
import { topPage } from "@/utils/topPage";

const Paragraph = ({
  textTag = "p",
  font,
  color,
  fontSize,
  letterSpacing,
  textDecoration,
  link,
  lineHeight,
  responsiveMobile,
  align,
  hasStrong,
  children,
  fontWeight,
  hasLink,
  HoverColor,
  target,
  width,
  rel,
  handleClick,
  isNextLink,
  arialLabel,
  onClick,
  cursor,
}: TypographyProps) => {
  if (link && isNextLink) {
    const router = useRouter();
    const dispatch = useDispatch();

    const defaultHandleClick = async (e: any) => {
      e.preventDefault();
      dispatch(onRedirectLoadingStart());
      topPage();
      await router.push(link);
      setTimeout(() => {
        dispatch(onRedirectLoadingFinished());
      }, 1200);
    };

    return (
      <LinkStyled
        href={link}
        onClick={(e: any) => {
          if (handleClick) {
            handleClick();
            defaultHandleClick(e);
          } else {
            defaultHandleClick(e);
          }
        }}
        $textDecoration={textDecoration}
        $align={align}
        $fontSize={fontSize}
        $hasStrong={hasStrong}
        $font={font}
        $lineHeight={lineHeight}
        $color={color}
        $responsiveMobile={responsiveMobile}
        $letterSpacing={letterSpacing}
        $hasLink={hasLink}
        $width={width}
        $HoverColor={HoverColor}
        $fontWeight={fontWeight}
        target={target}
        aria-label={arialLabel}
      >
        {children}
      </LinkStyled>
    );
  } else {
    return (
      <TypographyStyled
        as={textTag}
        href={link}
        $textDecoration={textDecoration}
        $align={align}
        $fontSize={fontSize}
        $hasStrong={hasStrong}
        $font={font}
        $lineHeight={lineHeight}
        $color={color}
        $responsiveMobile={responsiveMobile}
        $letterSpacing={letterSpacing}
        $hasLink={hasLink}
        $width={width}
        $HoverColor={HoverColor}
        $fontWeight={fontWeight}
        target={target}
        rel={rel}
        onClick={onClick}
        $cursor={cursor}
      >
        {children}
      </TypographyStyled>
    );
  }
};
export default Paragraph;
