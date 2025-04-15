import React, { useRef } from "react";
import { Step4Props } from "./types";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import Button from "@/components/Atoms/Buttons/Button";
import {
  Cointainer,
  CointainerInputs,
  IconWrapper,
  ImageHover,
  ImagesContainer,
} from "./styled";
import Image from "next/image";
import Images from "@/components/Atoms/Images/Images";
import Input from "@/components/Atoms/Input/Input";
import StepRadio from "@/components/Molecules/StepBody/StepRadio/StepRadio";
import Paragraph from "@/components/Atoms/Typography/Text";
import FloatingInput from "@/components/Molecules/FloatingInput/FloatingInput";
import { useDispatch, useSelector } from "react-redux";
import { onSendDataToNotion } from "@/state/user/userActions";
import { getThankuContent } from "@/state/order/orderSelector";
import ModalSteps from "@/components/Molecules/Modal/ModalSteps";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { FaTimesCircle } from "react-icons/fa";
import useStep4 from "./hooks";

const Svg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="none"
    >
      <g clip-path="url(#clip0_3234_7122)">
        <path
          d="M6 9.092V18.8C6 20.7096 6.79018 22.5409 8.1967 23.8912C9.60322 25.2414 11.5109 26 13.5 26C15.4891 26 17.3968 25.2414 18.8033 23.8912C20.2098 22.5409 21 20.7096 21 18.8V6.8C21 5.52696 20.4732 4.30606 19.5355 3.40589C18.5979 2.50571 17.3261 2 16 2C14.6739 2 13.4021 2.50571 12.4645 3.40589C11.5268 4.30606 11 5.52696 11 6.8V17.8184C11 18.1336 11.0647 18.4457 11.1903 18.7368C11.3159 19.028 11.5001 19.2926 11.7322 19.5155C11.9644 19.7383 12.24 19.9151 12.5433 20.0357C12.8466 20.1563 13.1717 20.2184 13.5 20.2184C14.163 20.2184 14.7989 19.9655 15.2678 19.5155C15.7366 19.0654 16 18.4549 16 17.8184V9.2"
          stroke="#202020"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3234_7122">
          <rect
            width="26"
            height="26"
            fill="white"
            transform="translate(0 0.621216)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const Step4 = ({
  valueSelect,
  selectedValue,
  notionInfo,
  setNotionInfo,
}: Step4Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    imagePreviews,
    handleFileChange,
    loadingImg,
    setImagePreviews,
    postalCode,
    inputValue,
    handleChange,
    showRequiredMessage,
    setPostalCode,
  } = useStep4();
  const dataUser = useSelector(getThankuContent);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const notionInfoSend = () => {
    const fullInfo = {
      ...notionInfo,
      images: imagePreviews,
      name: `${dataUser.billing.first_name} ${dataUser.billing.last_name}`,
      email: dataUser.billing.email,
      dni: dataUser.dni,
      orderNumber: dataUser.id,
      address:
        postalCode === "no"
          ? inputValue.direcction
          : `${dataUser.billing.address_1} ${dataUser.billing.address_2}`,
      postCode:
        postalCode === "no" ? inputValue.postalCode : dataUser.billing.postcode,
    };

    setNotionInfo(fullInfo);
    return fullInfo;
  };

  const handleSubmitToNotion = async () => {
    const fullInfo = notionInfoSend();
    console.log("fullInfo", fullInfo);
    // dispatch(onSendDataToNotion(fullInfo));
    setImagePreviews([]);
    setOpenModal(true);
  };

  return (
    <>
      <StepsHeaders
        span="Paso 4/4 - "
        backgroundColor="drWhite"
        title="Envianos algunas imágenes"
        paragraph={
          valueSelect === "1" && selectedValue === "1"
            ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Solo necesitamos que nos mandes una foto de lo que recibiste, incluyendo todos los productos y piezas que venían en la caja.\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
            : valueSelect === "1" && selectedValue === "2"
            ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Adjuntanos las siguientes imágenes del producto que recibiste demás para poder avanzar:\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
            : valueSelect === "1" && selectedValue === "3"
            ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Adjuntanos las siguientes imágenes del producto que recibiste para poder avanzar:\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
            : valueSelect === "1" && selectedValue === "4"
            ? `Gracias por la información ¡Último paso!
            Adjuntanos las siguientes imágenes del producto:\n
            1. Frente
            2. Dorso
            3. Falla`
            : valueSelect === "2"
            ? `Gracias por la información ¡Continuamos!\n
            Adjuntanos las siguientes imágenes del producto a devolver:\n
            1. Frente
            2. Dorso\n
            ❗ Si el producto nunca salió de su caja, mandanos una foto donde se vea la cinta de seguridad.`
            : `Gracias por la información ¡Continuamos!\n
            Adjuntanos las siguientes imágenes del producto a cambiar:\n
            1. Frente
            2. Dorso\n
            ❗ Si el producto nunca salió de su caja, mandanos una foto donde se vea la cinta de seguridad.`
        }
        onClick={() => handleSubmitToNotion()}
        button
        send
        value={imagePreviews.length > 0 ? false : true}
      >
        {valueSelect === "2" || valueSelect === "3" ? (
          <>
            <Paragraph fontSize="20px">
              Por último, ¿la dirección de retiro es la misma que la de entrega?
            </Paragraph>
            <StepRadio
              radioOptions={[
                {
                  value: "si",
                  label: "Si",
                },
                {
                  value: "no",
                  label: "No",
                },
              ]}
              name="retiro"
              checked={postalCode}
              onChange={(_, value) => {
                setPostalCode(value);
              }}
            />
            {postalCode === "no" ? (
              <CointainerInputs>
                <FloatingInput
                  label="Dirección"
                  labelRequired={showRequiredMessage ? "*" : ""}
                  labelRequiredColor="brilliantLiquorice"
                  input={{
                    placeholder: " ",
                    required: true,
                    colorLabel: "madForMango",
                    type: "text",
                    name: "direcction",
                    value: inputValue.direcction || "",
                    onChange: handleChange,
                  }}
                  labelColor="brilliantLiquorice"
                  labelBackgroundColor="white"
                  required={
                    showRequiredMessage
                      ? "Ingresá la nueva dirección de retiro"
                      : ""
                  }
                />
                <FloatingInput
                  width="45%"
                  label="Código postal"
                  labelRequired={showRequiredMessage ? "*" : ""}
                  labelRequiredColor="brilliantLiquorice"
                  input={{
                    placeholder: " ",
                    required: true,
                    colorLabel: "madForMango",
                    type: "text",
                    name: "postalCode",
                    value: inputValue.postalCode || "",
                    onChange: handleChange,
                  }}
                  labelColor="brilliantLiquorice"
                  labelBackgroundColor="white"
                  required={
                    showRequiredMessage ? "Ingresá el nuevo código postal" : ""
                  }
                />
              </CointainerInputs>
            ) : null}
          </>
        ) : null}
        <Input
          type="file"
          refInput={fileInputRef}
          display="none"
          onChange={handleFileChange}
        />
        <Button
          size="none"
          borderColor="lead"
          textColor="lead"
          borderRadius="1000px"
          fontSize="24px"
          font="medium"
          responsiveMobile={{ fontSize: "18px" }}
          onClick={handleButtonClick}
        >
          <Cointainer>
            <Svg />
            <Paragraph
              textTag="span"
              fontSize="24px"
              responsiveMobile={{
                fontSize: "18px",
              }}
            >
              Adjuntar imágenes
            </Paragraph>
          </Cointainer>
        </Button>
        <ImagesContainer>
          {loadingImg ? (
            <SkeletonLoader height="52px" width="100%" borderRadius="1000px" />
          ) : (
            imagePreviews.map((preview, index) => (
              <ImageHover
                key={index}
                onClick={() => {
                  setImagePreviews((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
              >
                <Images
                  src={preview}
                  alt={`Uploaded preview ${index + 1}`}
                  width="51px"
                  height="52px"
                  borderRadius="4px"
                  objectFit="cover"
                />
                <IconWrapper className="icon">
                  <FaTimesCircle color="orange" size={18} />
                </IconWrapper>
              </ImageHover>
            ))
          )}
        </ImagesContainer>
      </StepsHeaders>
      {openModal && (
        <ModalSteps
          title="¡Eso es todo por ahora!"
          buttonText="Aceptar"
          handleClose={() => setOpenModal(false)}
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

export default Step4;
