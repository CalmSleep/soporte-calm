import Input from "@/components/Atoms/Input/Input";
import React from "react";
import { RadioGroup, RadioOption } from "./styled";
import { StepRadioProps } from "./types";

const StepRadio = ({
  radioOptions,
  name,
  checked,
  onChange,
}: StepRadioProps) => {
  return (
    <RadioGroup>
      {radioOptions.map((option) => (
        <RadioOption key={option.value}>
          <Input
            appearance="none"
            width="14px"
            height="14px"
            responsiveMobile={{ width: "12px", height: "12px" }}
            padding="0px"
            checkBorderColor="yellowCalm"
            checkColor="yellowCalm"
            borderColorFocused="yellowCalm"
            color="yellowCalm"
            type="radio"
            name={name}
            value={option.value}
            checked={checked === option.value}
            onChange={(e) => {
              onChange?.(e, option.value);
            }}
          />
          {option.label}
        </RadioOption>
      ))}
    </RadioGroup>
  );
};

export default StepRadio;
