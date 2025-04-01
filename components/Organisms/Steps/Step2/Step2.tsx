import Button from "@/components/Atoms/Buttons/Button";
import Select from "@/components/Atoms/Select/Select";
import React from "react";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import Step3Option1 from "../Step3/Step3Select1/Step3Select1";
import useValueSelect from "@/hooks/useValueSelect";
import StepSelectButton from "@/components/Molecules/StepBody/StepSelectButton/StepSelectButton";

const Step2 = () => {
  const {
    confirmedValue,
    selectedValue,
    handleOnchangeButton,
    handleConfirm,
    setConfirmedValue,
  } = useValueSelect();

  return (
    <>
      <StepsHeaders
        span="Paso 2/4 - "
        title="Contanos cómo podemos ayudarte"
        paragraph="Seleccioná la opción que mejor describa tu caso"
        onClick={handleConfirm}
        value={selectedValue || ""}
        button
      >
        {confirmedValue === null ? (
          <Select
            onChange={handleOnchangeButton}
            value={selectedValue || ""}
            options={[
              ...(selectedValue === ""
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
          // <StepSelectButton
          //   button
          //   value={selectedValue || ""}
          //   onChange={handleOnchangeButton}
          //   onClick={handleConfirm}
          // option={[
          //   {
          //     value: "1",
          //     label: "Tuve un problema con el o los productos que recibí",
          //   },
          //   { value: "2", label: "Quiero devolver el producto" },
          //   { value: "3", label: "Quiero cambiar el producto" },
          // ]}
          // />
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
      {confirmedValue === "1" && <Step3Option1 />}
      {confirmedValue === "2" && <p>step3opcion2</p>}
      {confirmedValue === "3" && <p>step3opcion3</p>}
    </>
  );
};

export default Step2;
