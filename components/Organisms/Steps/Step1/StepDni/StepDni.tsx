import React, { useState } from "react";
import Button from "@/components/Atoms/Buttons/Button";
import { onGetOrdesDni } from "@/state/order/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { getOrdensDni } from "@/state/order/orderSelector";
import { getLoadingGetOrderDni } from "@/state/loading/loadingSelector";
import FloatingInput from "@/components/Molecules/FloatingInput/FloatingInput";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { validateDni } from "./funtions";
import ModalSteps from "@/components/Molecules/Modal/ModalSteps";
import { DniInput } from "./types";
import { set } from "date-fns";

const StepDni = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<DniInput>({
    dni: Number(),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showRequiredMessage, setShowRequiredMessage] = useState<boolean>(true);
  const data = useSelector(getOrdensDni);
  const loading = useSelector(getLoadingGetOrderDni);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Solo permitir números usando una regex
    if (/^\d*$/.test(value)) {
      setInputValue({ ...inputValue, [name]: value }); // Guardar como string

      const errors = validateDni({ ...inputValue, [name]: value });

      if (!value) {
        setErrorMessage("");
        setShowRequiredMessage(true);
      } else if (errors.dni) {
        setErrorMessage(errors.dni);
        setShowRequiredMessage(false);
      } else {
        setErrorMessage("");
        setShowRequiredMessage(false);
      }
    }
  };

  const handleDni = async () => {
    try {
      await dispatch(onGetOrdesDni(inputValue.dni.toString()));
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(true);
      setInputValue({ dni: 0 });
    }
  };

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    if (!domain) return email;

    return `${localPart[0]}${"*".repeat(localPart.length - 2)}${localPart.slice(
      -1
    )}@${domain}`;
  };
  function openChat() {
    var customEvent = new CustomEvent("openWebChatbot");
    window.dispatchEvent(customEvent);
  }
  const handleChatBot = () => {
    setTimeout(() => {
      setIsOpen(false);
      openChat();
    }, 200);
  };

  const borderColor = !inputValue.dni
    ? "madForMango"
    : errorMessage
    ? "rareRed"
    : "greenGrass";

  return (
    <>
      <FloatingInput
        label="DNI"
        labelRequired={showRequiredMessage ? "*" : ""}
        labelRequiredColor="brilliantLiquorice"
        input={{
          borderColorFocused: borderColor,
          placeholder: " ",
          required: true,
          colorLabel: "madForMango",
          type: "text",
          name: "dni",
          value: inputValue.dni || "",
          onChange: handleChange,
          onBlur: () => setShowRequiredMessage(true),
        }}
        labelColor="brilliantLiquorice"
        labelBackgroundColor="white"
        error={errorMessage}
        required={
          showRequiredMessage ? "Ingresá tu DNI sin puntos ni espacios" : ""
        }
      />

      {!loading && (
        <Button
          backgroundColor="lead"
          textColor="drWhite"
          borderRadius="1000px"
          fontSize="24px"
          responsiveMobile={{
            fontSize: "18px",
          }}
          onClick={handleDni}
          disabled={!inputValue.dni || errorMessage !== ""}
          disableStyles={true}
        >
          Siguiente
        </Button>
      )}
      {loading && (
        <SkeletonLoader
          height="60px"
          width="100%"
          borderRadius="1000px"
          responsiveMobile={{ height: "50px" }}
        />
      )}
      {isOpen && (
        <ModalSteps
          title={data && data.length > 0 ? "¡Muchas gracias!" : "Dni inválido"}
          paragraph={
            data && data?.length > 0
              ? `Te mandamos un mail al correo asociado a tu DNI: \n
        ${maskEmail(data && data[0]?.email)} \n
        Ahí vas a encontrar todos los pedidos que hiciste. Solo tenés que elegir sobre cuál querés avanzar y te vamos a llevar al formulario de soporte personalizado para esa orden. 🚀
        `
              : `¡No encontramos pedidos con tu DNI, pero no te preocupes, te vamos a ayudar.
        📩 Enviamos automáticamente un mensaje a nuestro asistente virtual para que te ayude a localizar tu pedido y avanzar con la gestión.

        En unos segundos, vas a ver el chat en pantalla. Si tenés tu número de pedido a mano, podés pasárselo directamente para agilizar el proceso.`
          }
          clicHere={data && data.length > 0 ? true : false}
          clicText="Si el correo registrado ya no es accesible,"
          clicText2="hace clic acá."
          onClick={() => {
            handleChatBot();
          }}
          handleClose={() => {
            if (data && data.length > 0) {
              setIsOpen(false);
            } else {
              handleChatBot();
            }
          }}
          buttonText="Aceptar"
        />
      )}
    </>
  );
};

export default StepDni;
