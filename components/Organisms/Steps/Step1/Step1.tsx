import StepDni from "@/components/Molecules/StepBody/StepDni/StepDni";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import { StepDniProps } from "./types";
import { useSelector } from "react-redux";
import { getThankuContent } from "@/state/order/orderSelector";
import { IOrder } from "@/state/order/types";
import Paragraph from "@/components/Atoms/Typography/Text";

const Step1 = ({ order, orderKey }: StepDniProps) => {
  const ordensDni: IOrder = useSelector(getThankuContent);
  console.log(ordensDni);

  return (
    <>
      {/* Paso estatico  */}
      <StepsHeaders
        span="Paso 1/4 - "
        title="Datos de tu compra"
        paragraph={
          order && orderKey
            ? ""
            : "Dejanos el DNI que usaste en tu compra y el punto de venta donde la realizaste. Con estos datos vamos a buscar tus pedidos y ayudarte a gestionar tu solicitud."
        }
      >
        {order && orderKey ? (
          <div>
            <div className="step">
              <Paragraph>{ordensDni.number}</Paragraph>
              <Paragraph>Sitio web (calmessimple.com)</Paragraph>
              <Paragraph>Pedido #Preguntar</Paragraph>
            </div>
          </div>
        ) : (
          <StepDni />
        )}
      </StepsHeaders>
    </>
  );
};

export default Step1;
