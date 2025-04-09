import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import useValueSelect from "@/hooks/useValueSelect";
import Step3Select1 from "./Step3Select1/Step3Select1";
import { Step3Props } from "./types";
import Step3Select2 from "./Step3Select2/Step3Select2";
import Step4 from "../Step4/Step4";
import { useSelector } from "react-redux";
import { getThankuContent } from "@/state/order/orderSelector";
const Step3 = ({ valueSelect, setConfirmedValue }: Step3Props) => {
  const {
    selectedValue,
    selectedTitles,
    setSelectedTitles,
    handleOnchangeWithoutConfirm,
    handleConfirmCheckbox,
    checkSeleccionado,
    handleCheckboxChange,
    checkboxConfirmed,
    handleEditCheckbox,
    handleCheckboxChangeConfirmed,
    handlePaymentChange,
  } = useValueSelect();
  console.log(selectedTitles);
  const orders = useSelector(getThankuContent);

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
          if (
            selectedTitles.some((title) =>
              title.toLowerCase().includes("cambio")
            )
          ) {
            setConfirmedValue("3");
            setSelectedTitles(
              selectedTitles.filter(
                (title) => !title.toLowerCase().includes("cambio")
              )
            );
          } else {
            handleConfirmCheckbox();
          }
        }}
        value={
          valueSelect === "1"
            ? !selectedValue || !checkSeleccionado
            : valueSelect === "2"
            ? !checkSeleccionado
            : valueSelect === "3"
            ? !checkSeleccionado
            : false
        }
        button={
          valueSelect === "1"
            ? !!selectedValue && !checkboxConfirmed
            : valueSelect === "2"
            ? !checkboxConfirmed
            : valueSelect === "3"
            ? !checkboxConfirmed
            : false
        }
        // value={!checkSeleccionado} descomentar para testear el valor 3
        //button={!checkboxConfirmed}
      >
        {valueSelect === "1" ? (
          <Step3Select1
            orders={orders.items.length > 0 ? orders.items : "Cargando..."}
            valueSelect={valueSelect}
            handleCheckboxChange={handleCheckboxChange}
            handleOnchangeWithoutConfirm={handleOnchangeWithoutConfirm}
            selectedValue={selectedValue}
            handleEditCheckbox={handleEditCheckbox}
            selectedTitles={selectedTitles}
            checkboxConfirmed={checkboxConfirmed}
            handleCheckboxChangeConfirmed={handleCheckboxChangeConfirmed}
            handlePaymentChange={handlePaymentChange}
          />
        ) : (
          <Step3Select2
            orders={orders.items.length > 0 ? orders.items : "Cargando..."}
            checkboxConfirmed={checkboxConfirmed}
            handleEditCheckbox={handleEditCheckbox}
            selectedTitles={selectedTitles}
            handleCheckboxChange={handleCheckboxChange}
            handleCheckboxChangeConfirmed={handleCheckboxChangeConfirmed}
            checkSeleccionado={checkSeleccionado}
            valueSelect={valueSelect}
          />
        )}
      </StepsHeaders>
      {checkboxConfirmed && <Step4 />}
    </>
  );
};

export default Step3;
