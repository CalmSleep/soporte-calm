import React, { useEffect } from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import items from "../../missingItems.json";
import { IChecks } from "@/components/Molecules/StepBody/StepSelects/types";
import { itemsFilterJson, mapOrdersWithSpan } from "../../../util";

const Select1Option = ({ onCheckboxChange, orders }: SelectOptionProps) => {
  const newOrders = mapOrdersWithSpan(orders);

  const matchedItems = itemsFilterJson(items, newOrders);

  const matchedIds = matchedItems.map((item) => item?.id);

  const checksOrders = newOrders
    .filter((order: any) => {
      return !matchedIds.some((id) => order.variation_id === Number(id));
    })
    .map((order: any): IChecks => {
      return {
        id: String(order.variation_id),
        value: String(order.variation_id),
        title: order.product_name,
        span: order.span,
      };
    });

  const radioOptions = [
    { value: "completo", label: "Falta este producto completo" },
    { value: "piezas", label: "Falta una o más piezas" },
  ];

  return (
    <StepSelects
      titleParagraph="Seleccioná el producto o las piezas faltantes:"
      checks={orders.length > 0 ? checksOrders : []}
      items={
        orders.length > 0 ? matchedItems.filter((item) => item !== null) : []
      }
      radioOptions={radioOptions}
      onCheckboxChange={(isChecked, title, radioGroup = []) =>
        onCheckboxChange(isChecked, title, radioGroup)
      }
    />
  );
};

export default Select1Option;
