import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import React from "react";
import Paragraph from "@/components/Atoms/Typography/Text";
import { ModalsProps } from "./types";
import { set } from "date-fns";

const ModalMeli = ({ isOpen, setIsOpen, setInputValue }: ModalsProps) => {
  const handleClose = () => {
    setInputValue &&
      setInputValue({
        dni: 0,
      });
    setIsOpen && setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <ModalSteps
          title="¡Muchas gracias!"
          paragraph={`Las gestiones de pedidos de Mercado Libre deben hacerse directamente desde su plataforma.`}
          buttonText="Aceptar"
          handleClose={handleClose}
        >
          <Paragraph>
            Entra a{" "}
            <Paragraph
              color="dullViolet"
              textTag="a"
              link="https://myaccount.mercadolibre.com.ar/my_purchases/list#menu-user"
              target="_blank"
            >
              tu compra Calm
            </Paragraph>
            , escribinos a través del chat y te ayudamos a avanzar con tu
            solicitud. ¡Te esperamos! 💬
          </Paragraph>
        </ModalSteps>
      )}
    </>
  );
};

export default ModalMeli;
