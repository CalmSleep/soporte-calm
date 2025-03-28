import Button from "@/components/Atoms/Buttons/Button";
import Input from "@/components/Atoms/Input/Input";
import FloatingInput from "@/components/Molecules/FloatingInput/FloatingInput";
import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";
import React from "react";

const Steps1 = () => {
  return (
    <SectionHeader
      sectionHeaderStyles={{
        $padding: "40px 400px",
        $gap: "16px",
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
          borderColorFocused: "madForMango",
          placeholder: " ",
          required: true,
          colorLabel: "madForMango",
        }}
        labelColor="brilliantLiquorice"
        labelBackgroundColor="white"
        required="Ingresá tu dni sin puntos ni espacios"
      />
      {/* Esto va a hacer un modulo dinamico, solo estoy haciendo una prueba */}
      <Button
        backgroundColor="lead"
        textColor="drWhite"
        borderRadius="1000px"
        fontSize="24px"
        responsiveMobile={{
          fontSize: "18px",
        }}
      >
        Siguiente{" "}
        {/* Esto va a hacer dinamico en base a que paso reciba, solo estoy haciendo una prueba */}
      </Button>
    </SectionHeader>
  );
};

export default Steps1;
