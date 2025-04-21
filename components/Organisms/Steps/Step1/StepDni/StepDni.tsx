import React, { useState } from "react";
import Button from "@/components/Atoms/Buttons/Button";
import { onGetOrdesDni } from "@/state/order/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { getOrdensDni } from "@/state/order/orderSelector";
import { getLoadingGetOrderDni } from "@/state/loading/loadingSelector";
import FloatingInput from "@/components/Molecules/FloatingInput/FloatingInput";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { validateDni } from "./funtions";
import { DniInput } from "./types";
import ModalCalm from "../../Modals/ModalCalm";
import ModalMeli from "../../Modals/ModalMeli";
import ModalFrav from "../../Modals/ModalFrav";
import ModalNotFound from "../../Modals/ModalNotFound";
import ModalDniInvalid from "../../Modals/ModalDniInvalid";
import ModalWhatsapp from "../../Modals/ModalWhatsapp";

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
      await dispatch(onGetOrdesDni(inputValue.dni.toString(), data || []));
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(true);
      setInputValue({ dni: 0 });
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
      {(data && data[0].saleSource === "webcalm") ||
      (data && data[0].saleSource?.includes("localm")) ? (
        <ModalCalm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleChatBot={handleChatBot}
          data={data}
        />
      ) : data && data[0].saleSource === "meli" ? (
        <ModalMeli isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : data && data[0].saleSource === "Fravega" ? (
        <ModalFrav isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : data && data.length === 0 ? (
        <ModalNotFound isOpen={isOpen} handleChatBot={handleChatBot} />
      ) : data && data[0].saleSource === "provincia_compras" ? (
        <ModalWhatsapp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          handleChatBot={handleChatBot}
        />
      ) : (
        <ModalDniInvalid isOpen={isOpen} handleChatBot={handleChatBot} />
      )}
    </>
  );
};

export default StepDni;
