import React from "react";
import { ModalStepsProps } from "./types";
import Button from "@/components/Atoms/Buttons/Button";
import Paragraph from "@/components/Atoms/Typography/Text";
import { ContainerModal } from "./styled";
import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";

const ModalSteps = ({
  title,
  paragraph,
  clicHere,
  clicText,
  clicText2,
  buttonText,
  onClick,
  handleClose,
  children,
}: ModalStepsProps) => {
  return (
    <ContainerModal>
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
            fontSize: "24px",
            lineHeight: "24px",
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
      </SectionHeader>
    </ContainerModal>
  );
};

export default ModalSteps;
