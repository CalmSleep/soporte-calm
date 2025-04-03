import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import useValueSelect from "@/hooks/useValueSelect";
import Step3Select1 from "./Step3Select1/Step3Select1";
import { Step3Props } from "./types";
import Step3Select2 from "./Step3Select2/Step3Select2";
import Step3Select3 from "./Step3Select3/Step3Select3";

const Step3 = ({ valueSelect }: Step3Props) => {
  console.log(valueSelect);

  const {
    selectedValue,
    handleOnchangeWithoutConfirm,
    handleConfirm,
    confirmedValue,
    checkSeleccionado,
    handleCheckboxChange,
  } = useValueSelect();
  return (
    <StepsHeaders
      span="Paso 3/4 - "
      title={
        valueSelect === "1"
          ? "Contanos cuál fue el problema"
          : valueSelect === "2"
          ? "Contanos qué productos querés devolver"
          : "Contanos qué productos querés cambiar"
      }
      paragraph={
        valueSelect === "1"
          ? "Contanos cuál fue el problema. Si no encontrás tu caso en estas opciones, escribinos y te ayudamos."
          : valueSelect === "2"
          ? "¿Necesitas devolver uno o más productos?¡No hay problema! Avancemos con la gestión..."
          : "¿Necesitas cambiar uno o más productos?¡No hay problema! Avancemos con la gestión..."
      }
      onClick={handleConfirm}
      value={selectedValue && checkSeleccionado ? "1" : confirmedValue || ""}
      button={selectedValue !== null ? true : false}
    >
      {valueSelect === "1" ? (
        <Step3Select1
          handleCheckboxChange={handleCheckboxChange}
          handleOnchangeWithoutConfirm={handleOnchangeWithoutConfirm}
          selectedValue={selectedValue}
        />
      ) : valueSelect === "2" ? (
        <Step3Select2 />
      ) : (
        <Step3Select3 />
      )}
    </StepsHeaders>
  );
};

export default Step3;
