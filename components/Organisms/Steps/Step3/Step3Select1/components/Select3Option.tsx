import React from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import { mapOrdersWithSpan } from "../../../util";

const Select3Option = ({ onCheckboxChange, orders }: SelectOptionProps) => {
  const newOrders = mapOrdersWithSpan(orders);
  const checks = newOrders.flatMap((order: any) => {
    const quantity = order.quantity || 1;

    const id =
      order.variation_id === 0
        ? String(order.product_id)
        : String(order.variation_id);

    const baseCheck = {
      id,
      value: id,
      title: order.product_name,
      span: order.span,
      quantity: order.quantity,
    };

    return Array.from({ length: quantity }, () => ({ ...baseCheck }));
  });

  return (
    <StepSelects
      titleParagraph="Elegí el o los productos que deberías haber recibido:"
      checks={orders.length > 0 ? checks : []}
      onCheckboxChange={(isChecked, title, checkId, radioGroup = []) =>
        onCheckboxChange(isChecked, title, checkId, radioGroup)
      }
    />
  );
};

export default Select3Option;
