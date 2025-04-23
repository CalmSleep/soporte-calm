import React from "react";
import { ModalsProps } from "./types";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import { maskEmail } from "../util";

const ModalCalm = ({
  isOpen,
  setIsOpen,
  handleChatBot,
  data,
  setInputValue,
}: ModalsProps) => {
  return (
    <>
      {isOpen && (
        <ModalSteps
          title="¡Muchas gracias!"
          paragraph={
            data &&
            `Te mandamos un mail al correo asociado a tu DNI: \n
        ${maskEmail(data && data[0]?.email)}\n
        Ahí vas a encontrar todos los pedidos que hiciste. Solo tenés que elegir sobre cuál querés avanzar y te vamos a llevar al formulario de soporte personalizado para esa orden. 🚀`
          }
          clicHere
          clicText="Si el correo registrado ya no es accesible, "
          clicText2="hace clic acá."
          onClick={() => {
            handleChatBot && handleChatBot();
          }}
          handleClose={() => {
            if (data && data.length > 0) {
              setInputValue &&
                setInputValue({
                  dni: 0,
                });
              setIsOpen && setIsOpen(false);
            } else {
              handleChatBot && handleChatBot();
            }
          }}
          buttonText="Aceptar"
        />
      )}
    </>
  );
};

export default ModalCalm;
