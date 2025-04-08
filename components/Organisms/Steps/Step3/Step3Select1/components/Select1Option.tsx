import React from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import items from "../../missingItems.json";

const Select1Option = ({ onCheckboxChange }: SelectOptionProps) => {
  const checks = [
    {
      id: "1",
      value: "1",
      name: "almohada",
      title: "Alta almohada",
      span: "(65x35cm)",
    },
    {
      id: "2",
      value: "2",
      name: "colchon",
      title: "Colchón Original Plus",
    },
  ];

  const radioOptions = [
    { value: "completo", label: "Falta este producto completo" },
    { value: "piezas", label: "Falta una o más piezas" },
  ];

  return (
    <StepSelects
      titleParagraph="Seleccioná el producto o las piezas faltantes:"
      checks={checks}
      items={items}
      radioOptions={radioOptions}
      onCheckboxChange={onCheckboxChange}
    />
  );
};

export default Select1Option;
