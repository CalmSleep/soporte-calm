import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";
import React, { useState } from "react";
import { StepHeaderProps } from "./types";
import Button from "@/components/Atoms/Buttons/Button";

const StepsHeaders = ({
  span,
  title,
  paragraph,
  children,
  value,
  onClick,
  button,
}: StepHeaderProps) => {
  return (
    <SectionHeader
      sectionHeaderStyles={{
        $padding: "40px 400px",
        $gap: "16px",
        $responsiveMobile: {
          padding: "24px 16px",
          gap: "24px",
        },
      }}
      spam={span}
      title={title}
      paragraph={paragraph}
      titleStyles={{
        color: "lead",
        fontWeight: 600,
        fontSize: "32px",
        lineHeight: "32px",
        letterSpacing: "-0.96px",
        responsiveMobile: {
          fontSize: "24px",
          lineHeight: "24px",
          letterSpacing: "-0.72px",
        },
      }}
      paragraphStyles={{
        color: "brilliantLiquorice",
        align: "left",
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "26px",
        letterSpacing: "-0.6px",
        responsiveMobile: {
          fontSize: "16px",
          lineHeight: "20.8px",
          letterSpacing: "-0.48px",
        },
      }}
      spamStyles={{
        color: "madForMango",
      }}
    >
      {children}
      {button && (
        <Button
          backgroundColor="lead"
          textColor="drWhite"
          borderRadius="1000px"
          fontSize="24px"
          responsiveMobile={{ fontSize: "18px" }}
          disabled={!!value}
          disableStyles={true}
          onClick={onClick}
        >
          Siguiente
        </Button>
      )}
    </SectionHeader>
  );
};

export default StepsHeaders;
