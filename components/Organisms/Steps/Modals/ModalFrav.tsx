import React from "react";
import { ModalsProps } from "./types";
import ModalSteps from "@/components/Molecules/Modal/ModalSteps";
import Paragraph from "@/components/Atoms/Typography/Text";

const ModalFrav = ({ isOpen, setIsOpen }: ModalsProps) => {
  const handleClose = () => {
    setIsOpen && setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <ModalSteps
          title="¡Muchas gracias!"
          paragraph={`Las gestiones de pedidos de Frávega deben hacerse directamente desde su plataforma.`}
          buttonText="Aceptar"
          handleClose={handleClose}
        >
          <Paragraph>
            Entra al detalle de{" "}
            <Paragraph
              color="dullViolet"
              textTag="a"
              link="https://www.fravega.com/mi-cuenta/mis-compras"
              target="_blank"
            >
              tu compra Calm
            </Paragraph>
            , hacé clic en <b>"Necesito ayuda"</b>, y su equipo de atención te
            va a asistir con tu solicitud. 💬
          </Paragraph>
        </ModalSteps>
      )}
    </>
  );
};

export default ModalFrav;
