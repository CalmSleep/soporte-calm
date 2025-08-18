import React, { useRef } from "react";
import { IDataSendNotion, Step4Props } from "./types";
import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import items from "../Step3/missingItems.json";
import Button from "@/components/Atoms/Buttons/Button";
import {
  Cointainer,
  CointainerInputs,
  IconWrapper,
  ImageHover,
  ImagesContainer,
  ImageWrapper,
} from "./styled";
import Images from "@/components/Atoms/Images/Images";
import Input from "@/components/Atoms/Input/Input";
import StepRadio from "@/components/Molecules/StepBody/StepRadio/StepRadio";
import Paragraph from "@/components/Atoms/Typography/Text";
import FloatingInput from "@/components/Molecules/FloatingInput/FloatingInput";
import { useDispatch, useSelector } from "react-redux";
import { onSendDataToNotion } from "@/state/user/userActions";
import { getThankuContent } from "@/state/order/orderSelector";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { FaTimesCircle } from "react-icons/fa";
import useStep4 from "./hooks";
import ModalSendInfo from "../Modals/ModalSendInfo";
import ModalCarousel from "../../Modals/ModalCarousel/ModalCarousel";
import { itemsFilterJson } from "../util";
import {
  getActionType,
  getProveedor,
  mapIssuesToNotionValues,
  parsePieces,
} from "./Notion/funtions";
import { getLoadingRedirect } from "@/state/loading/loadingSelector";
import { infoStep4 } from "../infoStep";
import { fullInfo } from "./Notion/sendNotion";

const Svg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="none"
    >
      <g clipPath="url(#clip0_3234_7122)">
        <path
          d="M6 9.092V18.8C6 20.7096 6.79018 22.5409 8.1967 23.8912C9.60322 25.2414 11.5109 26 13.5 26C15.4891 26 17.3968 25.2414 18.8033 23.8912C20.2098 22.5409 21 20.7096 21 18.8V6.8C21 5.52696 20.4732 4.30606 19.5355 3.40589C18.5979 2.50571 17.3261 2 16 2C14.6739 2 13.4021 2.50571 12.4645 3.40589C11.5268 4.30606 11 5.52696 11 6.8V17.8184C11 18.1336 11.0647 18.4457 11.1903 18.7368C11.3159 19.028 11.5001 19.2926 11.7322 19.5155C11.9644 19.7383 12.24 19.9151 12.5433 20.0357C12.8466 20.1563 13.1717 20.2184 13.5 20.2184C14.163 20.2184 14.7989 19.9655 15.2678 19.5155C15.7366 19.0654 16 18.4549 16 17.8184V9.2"
          stroke="#202020"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
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
  selectedTitleObjects,
}: Step4Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [errorNotion, setErrorNotion] = React.useState(false);
  const [modalImg, setModalImg] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    images,
    showImageErrorModal,
    setShowImageErrorModal,
    setImages,
    handleDragOver,
    handleDrop,
    handleFileChange,
    postalCode,
    inputValue,
    handleChange,
    showRequiredMessage,
    setPostalCode,
  } = useStep4();
  const dataUser = useSelector(getThankuContent);

  const dispatch = useDispatch();
  const loadingNotion = useSelector(getLoadingRedirect);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const radioOptions = [
    {
      value: "si",
      label: "Si",
    },
    {
      value: "no",
      label: "No",
    },
  ];

  const fullInfoSend = fullInfo(
    dataUser,
    notionInfo,
    selectedValue,
    valueSelect,
    images,
    selectedTitleObjects,
    postalCode,
    inputValue
  );

  console.log("fullInfoSend", fullInfoSend);

  const handleSubmitToNotion = async () => {
    setOpenModal(false);
    try {
      await dispatch(onSendDataToNotion(fullInfoSend));
      setImages([]);
      setOpenModal(true);
    } catch (error) {
      setErrorNotion(true);
    }
  };
  return (
    <>
      <StepsHeaders
        span="Paso 4/4 - "
        backgroundColor="drWhite"
        title="Envianos algunas imágenes"
        paragraph={infoStep4(valueSelect, selectedValue)}
        onClick={() => handleSubmitToNotion()}
        loading={loadingNotion}
        button
        send
        value={
          images.length === 0 ||
          images.every((img) => img.error) ||
          valueSelect === "2" ||
          valueSelect === "3" ||
          fullInfoSend.typeRequest.includes("Cambio") ||
          fullInfoSend.typeRequest.includes("Devolucion")
            ? !postalCode ||
              images.length === 0 ||
              images.every((img) => img.error)
            : false
        }
      >
        {/* valueSelect === "2" ||
        valueSelect === "3" ||
        fullInfoSend.typeRequest.includes("Cambio") ||
        fullInfoSend.typeRequest.includes("Devolucion") */
        dataUser ? (
          <>
            <Paragraph fontSize="20px">
              Por último, ¿la dirección de retiro es la misma que la de entrega?
            </Paragraph>
            <p>Direccion registrada: {dataUser.billing.address_1} {dataUser.billing.address_2} / {dataUser.billing.city.toUpperCase()} / {dataUser.billing.postcode}</p>
            <StepRadio
              radioOptions={radioOptions}
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
                  width="60%"
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
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
          <Input
            type="file"
            refInput={fileInputRef}
            display="none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleFileChange(e, fileInputRef);
            }}
          />
        </div>
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
        <Paragraph
          textTag="span"
          color="brilliantLiquorice"
          fontSize="13px"
          responsiveMobile={{
            fontSize: "12px",
          }}
        >
          * La imagen debe ser JPG, PNG, WEBP o GIF, pesar menos de 1 MB y no
          estar vacía ni dañada.
        </Paragraph>
        <ImagesContainer>
          {images.length > 0 &&
            images
              .filter((preview) => !preview.error)
              .map((preview, index) => (
                <ImageHover key={index}>
                  <ImageWrapper
                    className="image-wrapper"
                    onClick={() => setModalImg(true)}
                  >
                    {preview.loading ? (
                      <SkeletonLoader width="51px" height="52px" />
                    ) : (
                      <Images
                        src={preview.url!}
                        alt={`Uploaded preview ${index + 1}`}
                        width="51px"
                        height="52px"
                        borderRadius="4px"
                        objectFit="cover"
                      />
                    )}
                  </ImageWrapper>

                  <IconWrapper className="icon">
                    <FaTimesCircle
                      color="orange"
                      size={18}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();

                        setImages((images) =>
                          images.filter((_, i) => i !== index)
                        );
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                          fileInputRef.current.type = "text";
                          fileInputRef.current.type = "file";
                        }
                      }}
                    />
                  </IconWrapper>
                </ImageHover>
              ))}
        </ImagesContainer>
        {loadingNotion && (
          <SkeletonLoader
            height="60px"
            width="100%"
            borderRadius="1000px"
            responsiveMobile={{ height: "50px" }}
          />
        )}
      </StepsHeaders>
      {showImageErrorModal && (
        <ModalSteps
          title="No se pudo subir la imagen"
          paragraph={`Algunas imágenes no se pudieron subir.\n 
            Asegurate de que cumplan con los siguientes requisitos: \n 
            📸 Formatos permitidos: JPG, PNG, WEBP, GIF.
📏 Tamaño máximo: 1 MB por imagen.
🧼 La imagen no debe estar corrupta ni vacía.
            `}
          buttonText="Aceptar"
          handleClose={() => {
            setShowImageErrorModal(false);
          }}
        />
      )}

      {errorNotion ? (
        <ModalSteps
          title="No pudimos enviar la información"
          paragraph={`Ocurrió un error al intentar enviar la información.\n 
           Por favor, revisá tu conexión o intentá nuevamente en unos minutos.  
           Si el problema persiste, contactanos para que podamos ayudarte.`}
          buttonText="Aceptar"
          handleClose={() => {
            window.location.reload();
          }}
        />
      ) : (
        <ModalSendInfo
          isOpen={openModal}
          setIsOpen={setOpenModal}
          dataUser={dataUser}
          valueSelect={valueSelect}
        />
      )}
      <ModalCarousel
        modal={modalImg}
        modalHandle={() => setModalImg(false)}
        arrImages={images
          .filter((preview) => !preview.error)
          .map((image) => image.url!)}
      />
    </>
  );
};

export default Step4;
