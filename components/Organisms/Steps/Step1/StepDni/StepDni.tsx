import React, { useState } from "react";
import Button from "@/components/Atoms/Buttons/Button";
import { onGetOrdesDni } from "@/state/order/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { getOrdensDni } from "@/state/order/orderSelector";
import { getLoadingGetOrderDni } from "@/state/loading/loadingSelector";
import FloatingInput from "@/components/Molecules/FloatingInput/FloatingInput";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { validateDni } from "./funtions";
import { DniInput, EmailInput, IOrdenMail } from "./types";
import ModalCalm from "../../Modals/ModalCalm";
import ModalMeli from "../../Modals/ModalMeli";
import ModalFrav from "../../Modals/ModalFrav";
import ModalNotFound from "../../Modals/ModalNotFound";
import ModalDniInvalid from "../../Modals/ModalDniInvalid";
import ModalWhatsapp from "../../Modals/ModalWhatsapp";
import { Cointainer } from "./styled";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import SectionHeader from "@/components/Molecules/SectionHeader/SectionHeader";
import { isFromSpecialSource } from "../../util";

const StepDni = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<DniInput>({
    dni: Number(),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showRequiredMessage, setShowRequiredMessage] = useState<boolean>(true);

  const [inputEmail, setInputEmail] = useState<EmailInput>({
    email: "",
  });

  const [errorEmail, setErrorEmail] = useState<string>("");
  const [showRequiredEmail, setShowRequiredEmail] = useState<boolean>(true);

  const data = useSelector(getOrdensDni);
  console.log(data);

  const loading = useSelector(getLoadingGetOrderDni);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Solo permitir números usando una regex
    if (/^\d*$/.test(value)) {
      setInputValue({ ...inputValue, [name]: value });

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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputEmail({ ...inputEmail, [name]: value });
    if (!value) {
      setErrorEmail("");
      setShowRequiredEmail(true);
    } else {
      setErrorEmail("");
      setShowRequiredEmail(false);
    }
  };

  const handleDni = async () => {
    try {
      await dispatch(
        onGetOrdesDni(inputValue.dni.toString(), data || [], inputEmail.email)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(true);
    }
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
    : "millionGray";

  return (
    <>
      <FloatingInput
        label="DNI"
        labelRequired={showRequiredMessage ? "*" : ""}
        labelRequiredColor="brilliantLiquorice"
        input={{
          disabled: isFromSpecialSource(data) ? true : false,
          borderColor: borderColor,
          borderColorFocused: "millionGray",
          placeholder: " ",
          required: true,
          colorLabel: borderColor,
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
      {data && isFromSpecialSource(data) && (
        <Cointainer>
          <SectionHeader
            title="No encontramos un correo asociado a tu DNI."
            paragraph="Para poder localizar tu pedido, y enviarte los próximos pasos, completá tu dirección de mail 📩"
            sectionHeaderStyles={{ $padding: "5px", $gap: "10px" }}
          />
          <FloatingInput
            label="Email"
            marginTop="25px"
            labelRequired={showRequiredEmail ? "*" : ""}
            labelRequiredColor="brilliantLiquorice"
            input={{
              borderColor: borderColor,
              borderColorFocused: "millionGray",
              placeholder: " ",
              required: true,
              colorLabel: borderColor,
              type: "email",
              name: "email",
              value: inputEmail.email || "",
              onChange: handleChangeEmail,
              onBlur: () => setShowRequiredEmail(true),
            }}
            labelColor="brilliantLiquorice"
            labelBackgroundColor="white"
            error={errorEmail}
            required={showRequiredEmail ? "Ingresá tu Email" : ""}
          />
        </Cointainer>
      )}

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
          disabled={
            data && isFromSpecialSource(data)
              ? !inputValue.dni || !inputEmail.email || !!errorEmail
              : !inputValue.dni || errorMessage !== ""
          }
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
      {(data && data[0].saleSource === "webcalm") ||
      (data && data[0].saleSource?.includes("localm")) ? (
        <ModalCalm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleChatBot={handleChatBot}
          data={data}
          setInputValue={setInputValue}
        />
      ) : data && data[0].saleSource === "meli" ? (
        <ModalMeli
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setInputValue={setInputValue}
        />
      ) : data && data[0].saleSource === "Fravega" ? (
        <ModalFrav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setInputValue={setInputValue}
        />
      ) : data && data.length === 0 ? (
        <ModalNotFound
          isOpen={isOpen}
          handleChatBot={handleChatBot}
          setInputValue={setInputValue}
        />
      ) : data && data[0].email === inputEmail.email ? (
        <ModalWhatsapp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          handleChatBot={handleChatBot}
        />
      ) : data && isFromSpecialSource(data) ? null : (
        <ModalDniInvalid
          isOpen={isOpen}
          handleChatBot={handleChatBot}
          setInputValue={setInputValue}
        />
      )}
    </>
  );
};

export default StepDni;
