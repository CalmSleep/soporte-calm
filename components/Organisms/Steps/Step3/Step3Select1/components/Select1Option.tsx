import React, { useEffect } from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import items from "../../missingItems.json";

const Select1Option = ({ onCheckboxChange, orders }: SelectOptionProps) => {
  const matchedItems = items.filter((item) =>
    orders.some((order: any) => order.product_id === Number(item.id))
  );

  const matchedIds = matchedItems.map((item) => item.id);

  const checksOrders = orders
    .filter((order: any) => {
      return !matchedIds.some((title) => order.product_id === Number(title));
    })
    .map((order: any) => {
      return {
        id: String(order.product_id),
        value: String(order.product_id),
        title: order.product_name,
      };
    });

  console.log(checksOrders);
  const radioOptions = [
    { value: "completo", label: "Falta este producto completo" },
    { value: "piezas", label: "Falta una o más piezas" },
  ];

  return (
    <StepSelects
      titleParagraph="Seleccioná el producto o las piezas faltantes:"
      checks={orders.length > 0 ? checksOrders : []}
      items={orders.length > 0 ? matchedItems : []}
      radioOptions={radioOptions}
      onCheckboxChange={(isChecked, title, radioGroup = []) =>
        onCheckboxChange(isChecked, title, radioGroup)
      }
    />
  );
};

export default Select1Option;
