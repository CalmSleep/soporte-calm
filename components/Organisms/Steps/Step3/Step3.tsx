import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import useValueSelect from "@/hooks/useValueSelect";
import Step3Select1 from "./Step3Select1/Step3Select1";
import { Step3Props } from "./types";
import Step3Select2 from "./Step3Select2/Step3Select2";
import Step3Select3 from "./Step3Select3/Step3Select3";
import Step4 from "../Step4/Step4";
import { set } from "date-fns";
const Step3 = ({ valueSelect }: Step3Props) => {
  const {
    selectedValue,
    selectedTitles,
    handleOnchangeWithoutConfirm,
    handleConfirmCheckbox,
    checkSeleccionado,
    handleCheckboxChange,
    checkboxConfirmed,
    handleEditCheckbox,
    handleClickAcordion,
  } = useValueSelect();
  console.log(selectedTitles);

  return (
    <>
      <StepsHeaders
        span="Paso 3/4 - "
        backgroundColor="drWhite"
        title={
          valueSelect === "1"
            ? "Contanos cuál fue el problema"
            : valueSelect === "2"
            ? "Contanos qué productos querés devolver"
            : valueSelect === "3"
            ? "Contanos qué productos querés cambiar"
            : ""
        }
        paragraph={
          !checkboxConfirmed
            ? valueSelect === "1"
              ? "Contanos cuál fue el problema. Si no encontrás tu caso en estas opciones, escribinos y te ayudamos."
              : valueSelect === "2"
              ? "¿Necesitas devolver uno o más productos? ¡No hay problema! Avancemos con la gestión..."
              : "¿Necesitas cambiar uno o más productos? ¡No hay problema! Avancemos con la gestión..."
            : ""
        }
        onClick={() => {
          handleConfirmCheckbox();
        }}
        value={!selectedValue || !checkSeleccionado}
        button={!!selectedValue && !checkboxConfirmed}
      >
        {valueSelect === "1" ? (
          <Step3Select1
            valueSelect={valueSelect}
            handleCheckboxChange={handleCheckboxChange}
            handleOnchangeWithoutConfirm={handleOnchangeWithoutConfirm}
            selectedValue={selectedValue}
            handleEditCheckbox={handleEditCheckbox}
            selectedTitles={selectedTitles}
            checkboxConfirmed={checkboxConfirmed}
            handleClickAcordion={handleClickAcordion}
          />
        ) : valueSelect === "2" ? (
          <Step3Select2 />
        ) : (
          <Step3Select3 />
        )}
      </StepsHeaders>
      {checkboxConfirmed && <Step4 />}
    </>
  );
};

export default Step3;
