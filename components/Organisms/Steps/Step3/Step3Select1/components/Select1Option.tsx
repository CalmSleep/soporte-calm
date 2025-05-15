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
  //console.log("orders", orders);

  const matchedItems = itemsFilterJson(items, newOrders);

  const matchedIds = matchedItems.map((item) =>
    Array.isArray(item?.id) ? item.id.map(Number) : [Number(item?.id)]
  );

  const checksOrders = newOrders
    .filter((order: any) => {
      const variationId = Number(order.variation_id);
      const productId = Number(order.product_id);

      const isMatched = matchedIds.some((idsArray) => {
        return idsArray.includes(variationId === 0 ? productId : variationId);
      });
      return !isMatched;
    })
    .flatMap((order: any): IChecks[] => {
      const quantity = order.quantity || 1;

      const id =
        order.variation_id === 0
          ? String(order.product_id)
          : String(order.variation_id);

      const baseCheck: IChecks = {
        id: order.variation_id === 0 ? order.product_id : order.variation_id,
        value: id,
        title: order.product_name,
        span: order.span,
        quantity: order.quantity,
      };

      return Array.from({ length: quantity }, () => ({ ...baseCheck }));
    });
  // console.log("checksOrders", checksOrders);

  const radioOptions = [
    { value: "completo", label: "Falta este producto completo" },
    { value: "piezas", label: "Falta una o más piezas" },
  ];
  // console.log("matchedItems", matchedItems);

  return (
    <StepSelects
      titleParagraph="Seleccioná el producto o las piezas faltantes:"
      checks={orders.length > 0 ? checksOrders : []}
      items={
        orders.length > 0 ? matchedItems.filter((item) => item !== null) : []
      }
      radioOptions={radioOptions}
      onCheckboxChange={(isChecked, title, checkId, radioGroup = []) =>
        onCheckboxChange(isChecked, title, checkId, radioGroup)
      }
      idVariation={idVariation}
      setIdVariation={setIdVariation}
    />
  );
};

export default Select1Option;
