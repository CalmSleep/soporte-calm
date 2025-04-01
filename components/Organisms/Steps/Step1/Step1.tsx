import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import { StepDniProps } from "./types";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import StepDni from "./StepDni/StepDni";

const Step1 = ({ order }: StepDniProps) => {
  return (
    <>
      <StepsHeaders
        span="Paso 1/4 - "
        title="Datos de tu compra"
        paragraph={
          order
            ? ""
            : "Dejanos el DNI que usaste en tu compra y el punto de venta donde la realizaste. Con estos datos vamos a buscar tus pedidos y ayudarte a gestionar tu solicitud."
        }
      >
        {order ? (
          <StepInfo
            info={[order, "Sitio web (calmessimple.com)", "Pedido #Preguntar"]}
            link="/"
          />
        ) : (
          <StepDni />
        )}
      </StepsHeaders>
    </>
  );
};

export default Step1;
