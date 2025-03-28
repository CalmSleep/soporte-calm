import React from "react";
import { ModalStepsProps } from "./types";
import SectionHeader from "../SectionHeader/SectionHeader";
import Button from "@/components/Atoms/Buttons/Button";
import Paragraph from "@/components/Atoms/Typography/Text";
import { ContainerModal } from "./styled";

const ModalSteps = ({ open, setModal }: ModalStepsProps) => {
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setModal) {
      setModal(!open);
    }
  };
  return (
    <ContainerModal>
      <SectionHeader
        sectionHeaderStyles={{
          $width: "900px",
          $padding: "26px",
          $gap: "20px",
          $borderRadius: "22px",
        }}
        title="¡Muchas gracias!"
        paragraph={`Te mandamos un mail al correo asociado a tu DNI: \n

g*************m@gmail.com

Ahí vas a encontrar todos los pedidos que hiciste. Solo tenés que elegir sobre cuál querés avanzar y te vamos a llevar al formulario de soporte personalizado para esa orden. 🚀
`}
        titleStyles={{
          color: "lead",
          fontWeight: 600,
          fontSize: "40px",
          lineHeight: "40px",
          letterSpacing: "-1.2px",
          responsiveMobile: {
            fontSize: "24px",
            lineHeight: "24px",
            letterSpacing: "-0.72px",
          },
        }}
      >
        <Paragraph textTag="p" color="brilliantLiquorice">
          Si el correo registrado ya no es accesible,{" "}
          <Paragraph textTag="span" textDecoration="underline">
            hace clic acá.
          </Paragraph>
        </Paragraph>
        <Button
          backgroundColor="lead"
          textColor="drWhite"
          borderRadius="1000px"
          fontSize="24px"
          responsiveMobile={{
            fontSize: "18px",
          }}
          onClick={handleClose}
        >
          Aceptar
        </Button>
      </SectionHeader>
    </ContainerModal>
  );
};

export default ModalSteps;
