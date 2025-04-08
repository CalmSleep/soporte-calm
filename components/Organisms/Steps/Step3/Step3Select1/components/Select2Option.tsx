import React, { useState } from "react";
import { SelectOptionProps } from "../../types";
import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import Select from "@/components/Atoms/Select/Select";
import { tr } from "date-fns/locale";

const Select2Option = ({
  selectedValue,
  onCheckboxChange,
  handlePaymentChange,
}: SelectOptionProps) => {
  const radioOptions = [
    { value: "descuento", label: "Quiero comprarlo con un 5% de descuento" },
    { value: "devolucion", label: "Prefiero devolverlo" },
  ];

  const payments = [
    {
      value: "transferencia",
      label: "Transferencia con hasta 25% OFF",
    },
    {
      value: "credito",
      label: "Tarjeta de debito",
    },
    {
      value: "csi",
      label: "Tarjeta de crédito en hasta 12 csi",
    },
  ];
  console.log(selectedValue);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <StepSelects
        titleParagraph="Elegí la mejor opción:"
        radioOptions={radioOptions}
        onCheckboxChange={onCheckboxChange}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {selectedOption === "descuento" && (
        <Select
          options={payments}
          onChange={(e) => {
            const selectedLabel = payments.find(
              (p) => p.value === e.target.value
            )?.label;
            if (selectedLabel) {
              handlePaymentChange &&
                handlePaymentChange(selectedLabel, payments);
            }
          }}
        />
      )}
    </>
  );
};

export default Select2Option;
