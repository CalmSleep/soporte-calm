import Button from "@/components/Atoms/Buttons/Button";
import Select from "@/components/Atoms/Select/Select";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import StepSelectButton from "@/components/Molecules/StepBody/StepSelectButton/StepSelectButton";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import useValueSelect from "@/hooks/useValueSelect";
import React from "react";
import Select1Option from "./components/Select1Option";

const Step3Option1 = () => {
  const {
    confirmedValue,
    selectedValue,
    handleOnchangeWithoutConfirm,
    handleConfirm,
    setConfirmedValue,
  } = useValueSelect();

  return (
    <>
      <StepsHeaders
        span="Paso 3/4 - "
        title="Contanos cuál fue el problema"
        paragraph="Contanos cuál fue el problema. Si no encontrás tu caso en estas opciones, escribinos y te ayudamos."
      >
        <StepSelectButton
          value={selectedValue || ""}
          onChange={handleOnchangeWithoutConfirm}
          onClick={handleConfirm}
          option={[
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
        {selectedValue === "1" && <Select1Option />}
      </StepsHeaders>

      {selectedValue === "2" && <p>Valor 2</p>}
      {selectedValue === "3" && <p>Valor 3</p>}
      {selectedValue === "4" && <p>Valor 4</p>}
    </>
  );
};

export default Step3Option1;
