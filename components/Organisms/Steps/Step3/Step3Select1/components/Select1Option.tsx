import React, { useEffect } from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import items from "../../missingItems.json";
import { IChecks } from "@/components/Molecules/StepBody/StepSelects/types";
import { itemsFilterJson, mapOrdersWithSpan } from "../../../util";

const Select1Option = ({
  onCheckboxChange,
  orders,
  idVariation,
  setIdVariation,
}: SelectOptionProps) => {
  const newOrders = mapOrdersWithSpan(orders);

  const matchedItems = itemsFilterJson(items, newOrders);

  const matchedIds = matchedItems.map((item) => item?.id);

  const checksOrders = newOrders
    .filter((order: any) => {
      const variationId = Number(order.variation_id);
      const productId = Number(order.product_id);

      return !matchedIds.some((id) => {
        const itemId = Number(id);
        return variationId === 0
          ? productId === itemId
          : variationId === itemId;
      });
    })
    .map((order: any): IChecks => {
      const id =
        order.variation_id === 0
          ? String(order.product_id)
          : String(order.variation_id);

      return {
        id,
        value: id,
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
      idVariation={idVariation}
      setIdVariation={setIdVariation}
    />
  );
};

export default Select1Option;
