import React from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import items from "../../defectsItems.json";

const Select4Option = ({ onCheckboxChange }: SelectOptionProps) => {
  return (
    <StepSelects
      titleParagraph="Seleccioná el producto o las piezas faltantes:"
      items={items}
      onCheckboxChange={onCheckboxChange}
    />
  );
};

export default Select4Option;
