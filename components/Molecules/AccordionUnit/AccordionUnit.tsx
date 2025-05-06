import { useEffect, useRef, useState } from "react";
import { IUnitProps } from "./types";
import {
  TitleDiv,
  ImgStatic,
  ImgRotate,
  Content,
  Inner,
  DivIconPlus,
  DivContainerAccordion,
  DivTitleAccordion,
  DivTextAccordion,
  SubtitleAccordion,
  DescriptionAccordion,
  IconTitle,
  ContentItemSelect,
} from "./styled";
import parse from "html-react-parser";
import Titles from "@/components/Atoms/Typography/Titles";
import Images from "@/components/Atoms/Images/Images";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import Icons from "@/components/Atoms/Icons/Icons";
import { Less, Plus, Arrow } from "./iconsAcorrdion";
import Paragraph from "@/components/Atoms/Typography/Text";
import dynamic from "next/dynamic";
const Quizz = dynamic(() => import("@/components/Molecules/Quizz/Quizz"), {
  ssr: false,
});

const AccordionUnit = ({
  onClick,
  itemName,
  itemSubtitle,
  itemContent,
  isActive,
  isProductSS,
  isLastUnit,
  isOrange,
  isFromCapas,
  IconComponent,
  hasModal,
  onClickModal,
  imageSpecsCamaOla,
  descriptionCamaOla,
  itemsSelect,
  refContent,
  contentHeight,
  titleStyle,
  spamName,
}: IUnitProps) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("clickable-link") &&
      hasModal &&
      onClickModal
    ) {
      e.preventDefault();
      onClickModal();
    }
  };

  /*   if (!render) return null */

  return (
    <DivContainerAccordion
      $isLastUnit={isLastUnit}
      $descriptionCamaOla={descriptionCamaOla}
    >
      {imageSpecsCamaOla && (
        <Margin margin="5px 0">
          <Images
            src={imageSpecsCamaOla}
            alt="características"
            borderRadius="0"
            isLazy
          />
        </Margin>
      )}
      <DivTitleAccordion
        onClick={onClick}
        $descriptionCamaOla={descriptionCamaOla}
      >
        {/* <input type="checkbox" /> */}
        <TitleDiv>
          {isProductSS ? (
            <DivIconPlus>
              <Titles
                titleTag="h3"
                color={isOrange ? "darkerYellowCalm" : "offBlack"}
                font="extraBold"
                fontSize="1rem"
                responsiveMobile={{
                  fontSize: "16px",
                }}
              >
                {parse(itemName)}
              </Titles>

              <ImgStatic $isActive={isActive}>
                {isActive ? Less() : Plus()}
              </ImgStatic>
            </DivIconPlus>
          ) : (
            <>
              <IconTitle>
                {IconComponent && (
                  <Margin margin="6px 10px 0 0">
                    <Icons>
                      <IconComponent />
                    </Icons>
                  </Margin>
                )}
                <Titles
                  titleTag="h3"
                  color={
                    isOrange
                      ? "darkerYellowCalm"
                      : isFromCapas && isActive
                      ? "yellowCalm"
                      : "offBlack"
                  }
                  font="bold"
                  fontSize="1.2rem"
                  {...titleStyle}
                >
                  {parse(itemName)}{" "}
                </Titles>
                {spamName && (
                  <Paragraph textTag="span" fontSize="14px" color="millionGray">
                    {spamName}
                  </Paragraph>
                )}
              </IconTitle>

              <ImgRotate $isActive={isActive}>{Arrow()}</ImgRotate>
            </>
          )}
        </TitleDiv>
      </DivTitleAccordion>
      <DivTextAccordion>
        {itemsSelect ? (
          <ContentItemSelect
            id={itemName}
            ref={refContent}
            $isActive={isActive}
            $contentHeight={contentHeight || 0}
          >
            {itemsSelect}
          </ContentItemSelect>
        ) : (
          <Content
            id={itemName}
            $itemName={itemName}
            $isActive={isActive}
            $render={render}
          >
            <DescriptionAccordion
              $isProductSS={isProductSS}
              $isFromCapas={isFromCapas}
              onClick={handleContentClick}
              $descriptionCamaOla={descriptionCamaOla}
            >
              {itemSubtitle && (
                <SubtitleAccordion>{itemSubtitle}</SubtitleAccordion>
              )}
              <Inner id={itemName}>{parse(itemContent || "")}</Inner>

              {/*configurar estilos en styled component*/}
            </DescriptionAccordion>
          </Content>
        )}
      </DivTextAccordion>
    </DivContainerAccordion>
  );
};

export default AccordionUnit;
