import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import { StepDniProps } from "./types";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import StepDni from "./StepDni/StepDni";
import { useSelector } from "react-redux";
import { getThankuContent } from "@/state/order/orderSelector";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";

const Step1 = ({ order, dniUser }: StepDniProps) => {
  return (
    <>
      <StepsHeaders
        span="Paso 1/4 - "
        title="Datos de tu compra"
        paragraph={
          order
            ? ""
            : "Dejanos el DNI que usaste en tu compra. Con este dato vamos a buscar tus pedidos y ayudarte a gestionar tu solicitud."
        }
      >
        {order ? (
          <StepInfo
            info={[
              dniUser && dniUser ? (
                <>{dniUser}</>
              ) : (
                <SkeletonLoader
                  height="15px"
                  width="120px"
                  borderRadius="1000px"
                />
              ),
              <>Sitio web (calmessimple.com)</>,
              <>{`Pedido #${order}`}</>,
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
