import Select from "@/components/Atoms/Select/Select";
import React from "react";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import useValueSelect from "@/hooks/useValueSelect";
import Step3Select2 from "../Step3/Step3Select2/Step3Select2";
import Step3Select1 from "../Step3/Step3Select1/Step3Select1";
import Step3 from "../Step3/Step3";

const Step2 = () => {
  const {
    confirmedValue,
    selectedValue,
    handleCheckboxChange,
    handleOnchangeButton,
    handleOnchangeWithoutConfirm,
    handleConfirm,
    setConfirmedValue,
  } = useValueSelect();

  return (
    <>
      <StepsHeaders
        span="Paso 2/4 - "
        title="Contanos cómo podemos ayudarte"
        paragraph={
          confirmedValue !== null
            ? ""
            : "Seleccioná la opción que mejor describa tu caso"
        }
        onClick={handleConfirm}
        value={selectedValue || ""}
        button={confirmedValue === null ? true : false}
      >
        {confirmedValue === null ? (
          <Select
            onChange={handleOnchangeButton}
            value={selectedValue || ""}
            options={[
              ...(selectedValue === null
                ? [{ value: "", label: "Selecciona tu caso" }]
                : []),

              {
                value: "1",
                label: "Tuve un problema con el o los productos que recibí",
              },
              { value: "2", label: "Quiero devolver el producto" },
              { value: "3", label: "Quiero cambiar el producto" },
            ]}
          />
        ) : (
          <StepInfo
            info={[
              `${
                confirmedValue === "1"
                  ? "Tuve un problema con el o los productos que recibí."
                  : confirmedValue === "2"
                  ? "Quiero devolver el producto"
                  : "Quiero cambiar el producto"
              }`,
            ]}
            onClick={() => setConfirmedValue(null)}
          />
        )}
      </StepsHeaders>
      {confirmedValue !== null && <Step3 valueSelect={confirmedValue} />}
    </>
  );
};

export default Step2;
