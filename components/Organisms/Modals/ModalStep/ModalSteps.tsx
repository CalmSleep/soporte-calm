import React from "react";
import { ModalStepsProps } from "./types";
import Button from "@/components/Atoms/Buttons/Button";
import Paragraph from "@/components/Atoms/Typography/Text";
import { ButtonContainer, ContainerModal } from "./styled";
import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";
import { DivButtonClose } from "../ModalCarousel/styled";
import Icons from "@/components/Atoms/Icons/Icons";
import { CloseIcon } from "../../MainBlock/mainBlockicons";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";

const ModalSteps = ({
  title,
  paragraph,
  clicHere,
  clicText,
  clicText2,
  buttonText,
  onClick,
  handleClose,
  modalDevChange,
  children,
  arrayButton,
  icon,
  productsLoading,
}: ModalStepsProps) => {
  return (
    <ContainerModal>
      {icon && (
        <DivButtonClose className="header-closer-2">
          <Icons width="60%" onClick={handleClose}>
            {CloseIcon()}
          </Icons>
        </DivButtonClose>
      )}
      <SectionHeader
        sectionHeaderStyles={{
          $width: "900px",
          $padding: "26px",
          $gap: "20px",
          $borderRadius: "22px",
          $responsiveMobile: {
            width: "90%",
          },
        }}
        title={title || ""}
        paragraph={paragraph}
        paragraphStyles={{
          color: "lead",
          fontSize: "20px",
          lineHeight: "26px",
          letterSpacing: "-0.6px",
          responsiveMobile: {
            fontSize: "14px",
            lineHeight: "18.2px",
            letterSpacing: "-0.42px",
          },
        }}
        titleStyles={{
          color: "lead",
          fontWeight: 600,
          fontSize: "40px",
          lineHeight: "40px",
          letterSpacing: "-1.2px",
          responsiveMobile: {
            fontSize: "20px",
            lineHeight: "20px",
            letterSpacing: "-0.72px",
          },
        }}
      >
        {children}
        {clicHere && (
          <Paragraph textTag="p" color="brilliantLiquorice">
            {clicText}
            <Paragraph
              textTag="span"
              color="wildViolet"
              textDecoration="underline"
              onClick={onClick && onClick}
            >
              <Paragraph textTag="span" cursor="pointer">
                {clicText2}
              </Paragraph>
            </Paragraph>
          </Paragraph>
        )}
        {!modalDevChange && (
          <Button
            backgroundColor="lead"
            textColor="drWhite"
            borderRadius="1000px"
            fontSize="24px"
            responsiveMobile={{
              fontSize: "18px",
            }}
            onClick={handleClose}
          >
            {buttonText}
          </Button>
        )}
        {modalDevChange && (
          <ButtonContainer>
            {productsLoading ? (
              <SkeletonLoader
                height="20px"
                width="100%"
                borderRadius="1000px"
                responsiveMobile={{ height: "20px" }}
              />
            ) : (
              arrayButton &&
              arrayButton.map((item) => (
                <Button
                  key={item.id}
                  width="100%"
                  backgroundColor={item.backgroundColor}
                  textColor="drWhite"
                  borderRadius="1000px"
                  fontSize="17px"
                  responsiveMobile={{
                    fontSize: "13px",
                  }}
                  onClick={item.onClick}
                >
                  {item.text}
                </Button>
              ))
            )}
          </ButtonContainer>
        )}
      </SectionHeader>
    </ContainerModal>
  );
};

export default ModalSteps;
