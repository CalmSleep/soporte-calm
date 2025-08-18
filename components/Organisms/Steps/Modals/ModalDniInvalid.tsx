import React from "react";
import { ModalsProps } from "./types";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import { onGetOrderByDni } from "@/state/order/orderActions";
const ModalDniInvalid = ({
  isOpen,
  handleChatBot,
  setInputValue,
  dispatch,
}: ModalsProps) => {
  return (
    <>
      {isOpen && (
        <ModalSteps
          title="Dni inválido"
          paragraph={`No encontramos pedidos con tu DNI, pero no te preocupes, ¡te vamos a ayudar!.
📩 Enviamos automáticamente un mensaje a nuestro asistente virtual para que te ayude a localizar tu pedido y avanzar con la gestión.\n
En unos segundos, vas a ver el chat en pantalla. Si tenés tu número de pedido a mano, podés pasárselo directamente para agilizar el proceso.`}
          buttonText="Aceptar"
          handleClose={() => {
            setInputValue &&
              setInputValue({
                dni: 0,
              });
            dispatch && dispatch(onGetOrderByDni([]));
            handleChatBot &&
              handleChatBot(
                "Hola, no pude encontrar mi pedido con mi DNI y necesito ayuda para avanzar con la gestión."
              );
          }}
        />
      )}
    </>
  );
};

export default ModalDniInvalid;
