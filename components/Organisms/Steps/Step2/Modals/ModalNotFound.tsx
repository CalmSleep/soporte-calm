import React from "react";
import { ModalsProps } from "./types";
import { useRouter } from "next/router";
import ModalSteps from "@/components/Molecules/Modal/ModalSteps";
import Paragraph from "@/components/Atoms/Typography/Text";

const ModalNotFound = ({ isOpen, setIsOpen }: ModalsProps) => {
  const router = useRouter();
  function openChat() {
    var customEvent = new CustomEvent("openWebChatbot");
    window.dispatchEvent(customEvent);
  }
  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false);
      router.push("/");
      openChat();
    }, 200);
  };

  return (
    <>
      {isOpen && (
        <ModalSteps
          title="No hemos encontrado tu pedido"
          paragraph={`¡No encontramos pedidos con tu DNI, pero no te preocupes, te vamos a ayudar.
📩 Enviamos automáticamente un mensaje a nuestro asistente virtual para que te ayude a localizar tu pedido y avanzar con la gestión.\n
En unos segundos, vas a ver el chat en pantalla. Si tenés tu número de pedido a mano, podés pasárselo directamente para agilizar el proceso.
`}
          buttonText="Aceptar"
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ModalNotFound;
