import React from "react";
import { SelectOptionProps } from "../../types";
import Paragraph from "@/components/Atoms/Typography/Text";
import Input from "@/components/Atoms/Input/Input";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";

const Select3Option = ({ onCheckboxChange }: SelectOptionProps) => {
  const checks = [
    {
      id: "1",
      name: "almohada",
      value: "1",
      title: "Alta almohada",
    },
    {
      id: "2",
      name: "colchon",
      value: "2",
      title: "Colchón Original Plus",
    },
    {
      id: "3",
      name: "base",
      value: "3",
      title: "Base de hierro",
    },
  ];
  return (
    <StepSelects
      titleParagraph="Elegí el o los productos que deberías haber recibido:"
      checks={checks}
      onCheckboxChange={onCheckboxChange}
    />
  );
};

export default Select3Option;
