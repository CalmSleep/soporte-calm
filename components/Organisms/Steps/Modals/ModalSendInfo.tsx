import React from "react";
import { ModalsProps } from "./types";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import Paragraph from "@/components/Atoms/Typography/Text";
import { useRouter } from "next/navigation";

const ModalSendInfo = ({
  isOpen,
  setIsOpen,
  dataUser,
  valueSelect,
}: ModalsProps) => {
  const router = useRouter();
  const handleClose = () => {
    setIsOpen && setIsOpen(false);
    router.push("/");
  };
  return (
    <>
      {isOpen && (
        <ModalSteps
          title="¡Eso es todo por ahora!"
          buttonText="Aceptar"
          handleClose={handleClose}
        >
          <Paragraph textTag="p" fontSize="20px">
            Tu solicitud se envió correctamente, te dejamos el código de
            seguimiento:{" "}
            <Paragraph textTag="span" color="madForMango">
              #{dataUser.id}
            </Paragraph>
          </Paragraph>
          <Paragraph textTag="p" fontSize="20px">
            El equipo de soporte va a revisar tu caso y, en menos de 48 horas
            hábiles, te contactará por correo con más información y los pasos a
            seguir.
          </Paragraph>
          <Paragraph textTag="p" fontSize="20px">
            Muchas gracias por tu tiempo. ¡Quedamos en contacto!
          </Paragraph>
          {valueSelect === "3" && (
            <Paragraph
              textTag="span"
              fontSize="16px"
              color="brilliantLiquorice"
            >
              Tené en cuenta que por el cambio de modelo puede existir una
              diferencia a abonar, o a reembolsar. *Ver tyc 📎
            </Paragraph>
          )}
        </ModalSteps>
      )}
    </>
  );
};

export default ModalSendInfo;
