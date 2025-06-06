import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";
import React, { useState } from "react";
import { StepHeaderProps } from "./types";
import Button from "@/components/Atoms/Buttons/Button";

const StepsHeaders = ({
  span,
  title,
  padding,
  paragraph,
  children,
  value,
  onClick,
  button,
  backgroundColor,
  send,
  loading,
}: StepHeaderProps) => {
  return (
    <SectionHeader
      sectionHeaderStyles={{
        $padding: padding ? padding : "40px 300px",
        $gap: "16px",
        $responsiveMobile: {
          padding: "24px 16px",
          gap: "24px",
        },
        $backgroundColor: backgroundColor,
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
      {button && !loading && (
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
          {send ? "Enviar" : "Siguiente"}
        </Button>
      )}
    </SectionHeader>
  );
};

export default StepsHeaders;
