import React from "react";
import { ModalsProps } from "./types";
import ModalSteps from "@/components/Molecules/Modal/ModalSteps";

const ModalDniInvalid = ({ isOpen, handleChatBot }: ModalsProps) => {
  return (
    <>
      {isOpen && (
        <ModalSteps
          title="Dni inválido"
          paragraph={`¡No encontramos pedidos con tu DNI, pero no te preocupes, te vamos a ayudar.
📩 Enviamos automáticamente un mensaje a nuestro asistente virtual para que te ayude a localizar tu pedido y avanzar con la gestión.\n
En unos segundos, vas a ver el chat en pantalla. Si tenés tu número de pedido a mano, podés pasárselo directamente para agilizar el proceso.`}
          buttonText="Aceptar"
          handleClose={() => {
            handleChatBot && handleChatBot();
          }}
        />
      )}
    </>
  );
};

export default ModalDniInvalid;
