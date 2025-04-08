import React from "react";
import { SelectOptionProps } from "../types";
import Paragraph from "@/components/Atoms/Typography/Text";
import Input from "@/components/Atoms/Input/Input";

const Select3Option = ({ onCheckboxChange }: SelectOptionProps) => {
  const checks = [
    {
      id: "1",
      value: "1",
      title: "Alta almohada",
    },
    {
      id: "2",
      value: "2",
      title: "Colchón Original Plus",
    },
    {
      id: "3",
      value: "3",
      title: "Base de hierro",
    },
  ];
  return (
    <>
      <Paragraph>
        Elegí el o los productos que deberías haber recibido:
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

export default Select3Option;
