import React, { useState } from "react";
import {
  DniInput,
  IItemOrden,
  IOrdenMail,
  IOrderItem,
  IOrderResponse,
} from "./types";
import { emailResponse, validateDni } from "./funtions";
import Button from "@/components/Atoms/Buttons/Button";
import ModalSteps from "../../Modal/ModalSteps";
import SkeletonLoader from "../../SkeletonLoader/SkeletonLoader";
import { getOrderByDni, sendEmailOrderDni } from "@/state/order/orderServices";
import FloatingInput from "../../FloatingInput/FloatingInput";

const StepDni = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<DniInput>({
    dni: Number(),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showRequiredMessage, setShowRequiredMessage] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    data: IOrderResponse[];
    email: string;
  }>({
    data: [],
    email: "",
  });

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

  const sendEmail = async () => {
    try {
      if (data.email && data.data.length > 0) {
        const dataMail = emailResponse(data.data);
        const response = await sendEmailOrderDni(dataMail);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  const handleDni = async () => {
    setLoading(true);
    try {
      const response = await getOrderByDni(inputValue.dni.toString());
      if (response.data.length > 0 && response.data[0]?.billing?.email) {
        if (response.data[0]?.billing?.email) {
          setData({
            data: response.data,
            email: "chofiikauffer@gmail.com",
            //  email: response.data[0].billing.email,
          });
          sendEmail();
        }
      } else {
        setData({
          data: [],
          email: "",
        });
      }
    } catch (error) {
      console.error(error);
      setData({
        data: [],
        email: "",
      });
    } finally {
      setLoading(false);
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
        <SkeletonLoader height="20px" width="100%" borderRadius="1000px" />
      )}
      {isOpen && (
        <ModalSteps
          open={isOpen}
          setModal={setIsOpen}
          title={data.data.length > 0 ? "¡Muchas gracias!" : "Dni inválido"}
          paragraph={
            data.data.length > 0
              ? `Te mandamos un mail al correo asociado a tu DNI: \n
${maskEmail(data.email)} \n
Ahí vas a encontrar todos los pedidos que hiciste. Solo tenés que elegir sobre cuál querés avanzar y te vamos a llevar al formulario de soporte personalizado para esa orden. 🚀
`
              : `¡No encontramos pedidos con tu DNI, pero no te preocupes, te vamos a ayudar.
📩 Enviamos automáticamente un mensaje a nuestro asistente virtual para que te ayude a localizar tu pedido y avanzar con la gestión.

En unos segundos, vas a ver el chat en pantalla. Si tenés tu número de pedido a mano, podés pasárselo directamente para agilizar el proceso.`
          }
          clicHere={data.data.length > 0 ? true : false}
          clicText="Si el correo registrado ya no es accesible,"
          clicText2="hace clic acá."
          buttonText="Aceptar"
        />
      )}
    </>
  );
};

export default StepDni;
