import ModalSteps from "@/components/Molecules/Modal/ModalSteps";
import React from "react";
import Paragraph from "@/components/Atoms/Typography/Text";
import { useRouter } from "next/navigation";
import { ModalsProps } from "./types";

const ModalMeli = ({ isOpen, setIsOpen }: ModalsProps) => {
  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
    router.push("/");
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
