import React from "react";
import { CountryConfig, ModalsProps } from "./types";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import Paragraph from "@/components/Atoms/Typography/Text";

const ModalWhatsapp = ({
  isOpen,
  setIsOpen,
  data,
  handleChatBot,
}: ModalsProps) => {
  const countryConfigs: Record<string, CountryConfig> = {
    "54": { name: "Argentina", areaLength: 1 },
    "1": { name: "USA/Canada", areaLength: 3 },
    "34": { name: "Spain", areaLength: 2 },
    // Podés seguir agregando más países...
  };
  function formatPhoneNumber(number: string): string {
    if (!number.startsWith("+")) return number;

    // Probar desde 3 a 1 dígito para el código de país
    let countryCode = "";
    for (let len = 3; len >= 1; len--) {
      const code = number.slice(1, 1 + len);
      if (countryConfigs[code]) {
        countryCode = code;
        break;
      }
    }

    if (!countryCode) return `(Unknown) ********${number.slice(-2)}`;

    const config = countryConfigs[countryCode];

    // El número sin + ni código de país
    const rest = number.slice(1 + countryCode.length);

    const areaCode = rest.slice(0, config.areaLength);
    const remaining = rest.slice(config.areaLength);

    if (remaining.length < 2) return number;

    const masked = "*".repeat(remaining.length - 2) + remaining.slice(-2);

    return `(${countryCode}${areaCode}) ${masked}`;
  }

  return (
    <>
      {isOpen && (
        <ModalSteps
          title="¡Muchas gracias!"
          paragraph={
            data &&
            `Te mandamos un whatsapp al teléfono asociado a tu DNI:
        ${formatPhoneNumber(data && data[0]?.phone)}\n
        Ahí vas a encontrar todos los pedidos que hiciste. Solo tenés que elegir sobre cuál querés avanzar y te vamos a llevar al formulario de soporte personalizado para esa orden. 🚀`
          }
          clicHere
          clicText="Si el teléfono registrado ya no es accesible, "
          clicText2="hace clic acá."
          onClick={() => {
            handleChatBot && handleChatBot();
          }}
          handleClose={() => {
            if (data && data.length > 0) {
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

export default ModalWhatsapp;
