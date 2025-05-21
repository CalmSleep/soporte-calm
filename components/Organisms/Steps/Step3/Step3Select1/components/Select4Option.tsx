import React from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import items from "../../defectsItems.json";
import { itemsFilterJson, mapOrdersWithSpan } from "../../../util";

const Select4Option = ({
  onCheckboxChange,
  orders,
  idVariation,
  setIdVariation,
}: SelectOptionProps) => {
  const newOrders = mapOrdersWithSpan(orders);

  const matchedItems = itemsFilterJson(items, newOrders);

  return (
    <StepSelects
      titleParagraph="Elegí el o los productos con fallados y seleccioná que tipo de falla presenta:"
      items={orders.length > 0 ? matchedItems : []}
      onCheckboxChange={(isChecked, title, checkId, radioGroup = []) =>
        onCheckboxChange(isChecked, title, checkId, radioGroup)
      }
      idVariation={idVariation}
      setIdVariation={setIdVariation}
    />
  );
};

export default Select4Option;
