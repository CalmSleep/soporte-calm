import React from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import { mapOrdersWithSpan } from "../../../util";

const Select3Option = ({
  onCheckboxChange,
  orders,
  idVariation,
  setIdVariation,
}: SelectOptionProps) => {
  const newOrders = mapOrdersWithSpan(orders);
  const checks = newOrders.map((order: any) => {
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
  console.log("checks", checks);

  return (
    <StepSelects
      titleParagraph="Elegí el o los productos que deberías haber recibido:"
      checks={orders.length > 0 ? checks : []}
      onCheckboxChange={(isChecked, title, radioGroup = []) =>
        onCheckboxChange(isChecked, title, radioGroup)
      }
      idVariation={idVariation}
      setIdVariation={setIdVariation}
    />
  );
};

export default Select3Option;
