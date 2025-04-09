import React from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import items from "../../defectsItems.json";

const Select4Option = ({ onCheckboxChange, orders }: SelectOptionProps) => {
  const matchedItems = items.filter((item) =>
    orders.some((order: any) => order.product_id === Number(item.id))
  );

  return (
    <StepSelects
      titleParagraph="Seleccioná el producto o las piezas faltantes:"
      items={orders.length > 0 ? matchedItems : []}
      onCheckboxChange={(isChecked, title, radioGroup = []) =>
        onCheckboxChange(isChecked, title, radioGroup)
      }
    />
  );
};

export default Select4Option;
