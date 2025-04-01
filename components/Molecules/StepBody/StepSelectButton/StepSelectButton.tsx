import Button from "@/components/Atoms/Buttons/Button";
import Select from "@/components/Atoms/Select/Select";
import React from "react";
import { StepSelectButtonProps } from "./types";

const StepSelectButton = ({
  value,
  onChange,
  onClick,
  option,
  button,
}: StepSelectButtonProps) => {
  return (
    <>
      <Select
        onChange={onChange}
        value={value || ""}
        options={[
          ...(value === "" ? [{ value: "", label: "Selecciona tu caso" }] : []),
          ...option,
        ]}
      />
      {button && (
        <Button
          backgroundColor="lead"
          textColor="drWhite"
          borderRadius="1000px"
          fontSize="24px"
          responsiveMobile={{ fontSize: "18px" }}
          disabled={value === null || value === ""}
          disableStyles={true}
          onClick={onClick}
        >
          Siguiente
        </Button>
      )}
    </>
  );
};

export default StepSelectButton;
