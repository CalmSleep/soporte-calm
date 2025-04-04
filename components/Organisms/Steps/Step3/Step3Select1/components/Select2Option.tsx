import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import React from "react";
import { SelectOptionProps } from "../types";

const Select2Option = ({ onCheckboxChange }: SelectOptionProps) => {
  const checks = [
    {
      id: "1",
      value: "1",
      title: "Quiero comprarlo con un 5% de descuento",
    },
    {
      id: "2",
      value: "2",
      title: "Prefiero devolverlo",
    },
  ];

  return (
    <>
      <Paragraph>
        Te ofrecemos dos opciones para que elijas la mejor solución para vos:
      </Paragraph>
      {checks.map((check) => {
        return (
          <div key={check.id} className="flex">
            <Input
              width="16px"
              color="mangoTango"
              height="16px"
              type="checkbox"
              value={check.value}
              onChange={(e) => onCheckboxChange(e.target.checked, check.title)}
            />
            <Paragraph>{check.title}</Paragraph>
          </div>
        );
      })}
    </>
  );
};

export default Select2Option;
