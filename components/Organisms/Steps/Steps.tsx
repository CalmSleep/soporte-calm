import Button from "@/components/Atoms/Buttons/Button";
import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import FloatingInput from "@/components/Molecules/FloatingInput/FloatingInput";
import ModalSteps from "@/components/Molecules/Modal/ModalSteps";
import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";
import { da } from "date-fns/locale";
import React, { useState } from "react";

const Steps = () => {
  const [isOpen, setIsOpen] = useState(false);
  //datos del usuario hardcode , despues se cambia por peticion
  const datesConfirmed = {
    dni: "41263974",
    pages: "Sitio web (calmessimple.com)",
    orden: "Pedido #2404372",
  };

  return (
    <SectionHeader
      sectionHeaderStyles={{
        $padding: "40px 400px",
        $gap: "16px", //  gap dinamico cuando sea por paso
        // $gap: "5px",
        $responsiveMobile: {
          padding: "24px 16px",
          gap: "24px",
        },
      }}
      spam="Paso 1/4 - "
      title="Datos de tu compra"
      paragraph="Dejanos el DNI que usaste en tu compra y el punto de venta donde la realizaste. Con estos datos vamos a buscar tus pedidos y ayudarte a gestionar tu solicitud."
      titleStyles={{
        color: "lead",
        fontWeight: 600,
        fontSize: "32px",
        lineHeight: "32px",
        letterSpacing: "-0.96px",
        responsiveMobile: {
          fontSize: "24px",
          lineHeight: "24px",
          letterSpacing: "-0.72px",
        },
      }}
      paragraphStyles={{
        color: "brilliantLiquorice",
        align: "left",
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "26px",
        letterSpacing: "-0.6px",
        responsiveMobile: {
          fontSize: "16px",
          lineHeight: "20.8px",
          letterSpacing: "-0.48px",
        },
      }}
      spamStyles={{
        color: "madForMango",
      }}
    >
      <FloatingInput
        label="DNI"
        labelRequired="*"
        labelRequiredColor="brilliantLiquorice"
        input={{
          type: "number",
          borderColorFocused: "madForMango",
          placeholder: " ",
          required: true,
          colorLabel: "madForMango",
        }}
        labelColor="brilliantLiquorice"
        labelBackgroundColor="white"
      />

      {/* <Paragraph color="brilliantLiquorice">{datesConfirmed.dni}</Paragraph>
      <Paragraph color="brilliantLiquorice">{datesConfirmed.pages}</Paragraph>
      <Paragraph color="brilliantLiquorice">{datesConfirmed.orden}</Paragraph> */}

      {/* Esto va a hacer un modulo dinamico, solo estoy haciendo una prueba */}

      {/*  <Button
        backgroundColor="lead"
        textColor="drWhite"
        borderRadius="1000px"
        fontSize="24px"
        responsiveMobile={{
          fontSize: "18px",
        }}
        onClick={() => setIsOpen(true)} // ✅ Llamada correcta
      >
        Siguiente{" "}
      Esto va a hacer dinamico en base a que paso reciba, solo estoy haciendo una prueba 
      </Button>
      {isOpen && <ModalSteps open={isOpen} setModal={setIsOpen} />}*/}
    </SectionHeader>
  );
};

export default Steps;
