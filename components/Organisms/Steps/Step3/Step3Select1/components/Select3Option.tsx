import React from "react";
import { SelectOptionProps } from "../../types";
import Paragraph from "@/components/Atoms/Typography/Text";
import Input from "@/components/Atoms/Input/Input";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";

const Select3Option = ({ onCheckboxChange, orders }: SelectOptionProps) => {
  const checks = orders.map((order: any) => {
    return {
      id: String(order.product_id),
      value: String(order.product_id),
      title: order.product_name,
    };
  });

  return (
    <StepSelects
      titleParagraph="Elegí el o los productos que deberías haber recibido:"
      checks={orders.length > 0 ? checks : []}
      onCheckboxChange={(isChecked, title, radioGroup = []) =>
        onCheckboxChange(isChecked, title, radioGroup)
      }
    />
  );
};

export default Select3Option;
