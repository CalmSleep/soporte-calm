import React from "react";
import { ModalsProps } from "./types";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import { maskEmail } from "../util";
import { onGetOrderByDni } from "@/state/order/orderActions";

const ModalWhatsapp = ({
  isOpen,
  setIsOpen,
  data,
  handleChatBot,
  dispatch,
}: ModalsProps) => {
  return (
    <>
      {isOpen && (
        <ModalSteps
          title="¡Muchas gracias!"
          paragraph={
            data &&
            `Te mandamos un mail al correo indicado: \n
                  ${maskEmail(data && data[0]?.email)}\n
                  Ahí vas a encontrar todos los pedidos que hiciste. Solo tenes que elegir sobre cuál querés avanzar y te vamos a llevar a formulario de soporte personalizado para esa orden.🚀`
          }
          clicHere
          handleClose={() => {
            if (data && data.length > 0) {
              setIsOpen && setIsOpen(false);
              window.location.reload();
            } else {
              dispatch && dispatch(onGetOrderByDni([]));
              handleChatBot && handleChatBot("Hola! No encuentro mi pedido");
            }
          }}
          buttonText="Aceptar"
        />
      )}
    </>
  );
};

export default ModalWhatsapp;
