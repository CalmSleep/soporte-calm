import Select from "@/components/Atoms/Select/Select";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import useValueSelect from "@/hooks/useValueSelect";
import React from "react";
import Select1Option from "./components/Select1Option";
import Step4 from "../../Step4/Step4";
import { Step3Select1Props } from "./types";
import Paragraph from "@/components/Atoms/Typography/Text";

const Step3Select1 = ({
  selectedValue,
  handleOnchangeWithoutConfirm,
  handleCheckboxChange,
}: Step3Select1Props) => {
  return (
    <>
      <Select
        onChange={handleOnchangeWithoutConfirm}
        value={selectedValue || ""}
        options={[
          ...(selectedValue === null
            ? [{ value: "", label: "Selecciona tu caso" }]
            : []),
          {
            value: "1",
            label: "Mi pedido está incompleto o faltan piezas",
          },
          {
            value: "2",
            label: "Recibí un producto demás",
          },
          {
            value: "3",
            label: "Recibí un producto que no es el que pedí",
          },
          {
            value: "4",
            label: "Recibí un producto con una falla de fábrica",
          },
        ]}
      />
      {selectedValue === "1" && (
        <Select1Option onCheckboxChange={handleCheckboxChange} />
      )}

      {/* {checkboxConfirmed && <Step4 />}
      {selectedValue === "2" && <p>Valor 2</p>}
      {selectedValue === "3" && <p>Valor 3</p>}
      {selectedValue === "4" && <p>Valor 4</p>} */}
    </>
  );
};

export default Step3Select1;
