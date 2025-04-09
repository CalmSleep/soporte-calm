import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import { StepDniProps } from "./types";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import StepDni from "./StepDni/StepDni";
import { useSelector } from "react-redux";
import { getThankuContent } from "@/state/order/orderSelector";

const Step1 = ({ order }: StepDniProps) => {
  const dniUser = useSelector(getThankuContent);
  console.log("dniUser", dniUser);

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
            info={[
              dniUser?.dni ? dniUser.dni : "Cargando...",
              "Sitio web (calmessimple.com)",
              `Pedido #${order}`,
            ]}
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
