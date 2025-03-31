import StepDni from "@/components/Molecules/StepBody/StepDni/StepDni";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";

const Step1 = () => {
  return (
    <>
      {/* Paso estatico  */}
      <StepsHeaders
        span="Paso 1/4 -"
        title="Datos de tu compra"
        paragraph="Dejanos el DNI que usaste en tu compra y el punto de venta donde la realizaste. Con estos datos vamos a buscar tus pedidos y ayudarte a gestionar tu solicitud."
      >
        <StepDni />
      </StepsHeaders>
    </>
  );
};

export default Step1;
