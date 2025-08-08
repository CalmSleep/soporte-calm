import Paragraph from "@/components/Atoms/Typography/Text";
import React from "react";
import { StepInfoProps } from "./types";
import { StepInfoStyles } from "./styled";

const StepInfo = ({ info, link, onClick }: StepInfoProps) => {

  return (
    <>
      <StepInfoStyles>
        {info.map((item, index) => (
          <Paragraph
            key={index}
            fontSize="20px"
            color="brilliantLiquorice"
            letterSpacing="-0.6px"
            lineHeight="26px"
          >
            {item}
          </Paragraph>
        ))}
      </StepInfoStyles>
      <Paragraph
        textTag="a"
        textDecoration="underline"
        link={link}
        fontSize="20px"
        color="wildViolet"
        letterSpacing="-0.6px"
        lineHeight="26px"
        onClick={onClick}
      >
        Editar
      </Paragraph>
    </>
  );
};

export default StepInfo;
