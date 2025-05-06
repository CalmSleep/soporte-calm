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
  ImagesContainerModal,
  ImageWrapper,
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
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { FaTimesCircle } from "react-icons/fa";
import useStep4 from "./hooks";
import ModalSendInfo from "../Modals/ModalSendInfo";
import ModalCarousel from "../../Modals/ModalCarousel/ModalCarousel";
import { formatDateToISO, itemsFilterJson } from "../util";
import {
  getActionType,
  getProveedor,
  mapIssuesToNotionValues,
  parsePieces,
  skuChangeFilter,
  skuFilterProduct,
} from "./funtions";
import { getLoadingRedirect } from "@/state/loading/loadingSelector";

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
  console.log("valueSelect", valueSelect);

  // console.log(dataUser);

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

  const rawString = notionInfo.problemDescription[1];

  console.log("rawString", rawString);

  const matchedItems = itemsFilterJson(items, dataUser.items);
  const pieces = matchedItems.flatMap((item) => item.pieces);
  const actionMap = {
    descuento: "Gestionar cobro extra",
    devolverlo: "Retiro",
  };
  const typeRequestMap = {
    descuento: "Orden con incidente",
    devolverlo: "Devolucion",
  };
  const differencePriceMap = {
    descuento: "Abona diferencia",
    devolverlo: "No aplica/Garantía",
  };

  const proveedor =
    dataUser._wc_shipment_tracking_items.length === 0
      ? "-"
      : dataUser._wc_shipment_tracking_items[
          dataUser._wc_shipment_tracking_items.length - 1
        ].map((item: any) => item.tracking_provider);

  console.log(proveedor);

  const fullInfo: IDataSendNotion = {
    orderNumber: String(dataUser.id),
    name: `${dataUser.billing.first_name} ${dataUser.billing.last_name}`,
    email: dataUser.billing.email,
    shippingDate:
      dataUser.shipping_date === undefined
        ? null
        : formatDateToISO(dataUser.shipping.shipping_date),
    requestDate: new Date(),
    typeRequest:
      Number(selectedValue) === 1
        ? "Orden con incidente"
        : Number(selectedValue) === 2
        ? getActionType(notionInfo.problemDescription, typeRequestMap)
        : Number(valueSelect) === 2
        ? "Devolucion"
        : "Cambio",
    typeChange:
      Number(selectedValue) === 3
        ? [
            {
              name: "Error de P/P",
            },
          ]
        : Number(selectedValue) === 4
        ? [
            {
              name: "Garantía",
            },
          ]
        : [],
    reason:
      Number(selectedValue) === 1 || Number(selectedValue) === 3
        ? [{ name: "Otro" }]
        : Number(selectedValue) === 4
        ? mapIssuesToNotionValues(rawString).map((value) => ({
            name: value.name,
          }))
        : Number(selectedValue) === 2
        ? [{ name: "Error en la entrega" }]
        : Number(valueSelect) === 2 || Number(valueSelect) === 3
        ? mapIssuesToNotionValues(
            notionInfo.productReturn?.join(", ") || ""
          ).map((value) => ({
            name: value.name,
          }))
        : [],
    action:
      Number(selectedValue) === 1
        ? "Nuevo pedido"
        : Number(selectedValue) === 2
        ? getActionType(notionInfo.problemDescription, actionMap)
        : Number(selectedValue) === 3 ||
          Number(selectedValue) === 4 ||
          Number(valueSelect) === 2 ||
          Number(valueSelect) === 3
        ? "Retiro"
        : "Ninguna",
    differencePrice:
      Number(selectedValue) === 2
        ? getActionType(notionInfo.problemDescription, differencePriceMap)
        : Number(valueSelect) === 2
        ? "Reembolso"
        : Number(valueSelect) === 3
        ? "-"
        : "No aplica/Garantía",
    refund: Number(valueSelect) === 2 ? "Reembolso pendiente" : "",
    supplier: proveedor !== false ? getProveedor(proveedor) : "-",
    images: images
      .filter((img) => !img.error)
      .map((img, index) => {
        return {
          name: `foto-reclamo-${(index + 1).toString().padStart(2, "0")}`,
          type: "external",
          external: {
            url: img.url || "",
          },
        };
      }),
    skuOriginal:
      Number(selectedValue) === 1 || Number(selectedValue) === 4
        ? skuFilterProduct(dataUser, rawString)
        : Number(valueSelect) === 2 || Number(valueSelect) === 3
        ? skuFilterProduct(dataUser, notionInfo.productReturn?.join(", ") || "")
        : [
            {
              name: "-",
            },
          ],
    skuChange:
      Number(valueSelect) === 3
        ? skuChangeFilter(notionInfo.productChange || [])
        : [],
    peaces:
      Number(selectedValue) === 1 ? parsePieces(rawString, pieces).names : [],
    peacesChange:
      Number(selectedValue) === 1 ? parsePieces(rawString, pieces).names : [],
    peacesQuantity:
      Number(selectedValue) === 1
        ? parsePieces(rawString, pieces).quantities
        : "",
    comments:
      Number(selectedValue) === 1
        ? parsePieces(rawString, pieces).otherMessage
        : Number(selectedValue) === 2 || Number(selectedValue) === 3
        ? notionInfo.problemDescription.some(
            (desc: string) => desc.trim() === ""
          )
          ? notionInfo.problemDescription[0]
          : notionInfo.problemDescription.join(", ")
        : Number(selectedValue) === 4
        ? mapIssuesToNotionValues(rawString)
            .filter((value) => value.comments)
            .map((value) => value.comments)
            .join(", ")
        : Number(valueSelect) === 2 || Number(valueSelect) === 3
        ? mapIssuesToNotionValues(notionInfo.productReturn?.join(", ") || "")
            .filter((value) => value.comments)
            .map((value) => value.comments)
            .join(", ")
        : "-",
    addressData: !postalCode
      ? null
      : Number(valueSelect) === 4 || postalCode === "no"
      ? "NO"
      : "SI",
    addressNew:
      inputValue.direcction !== "" && inputValue.postalCode !== ""
        ? `Direccion: ${inputValue.direcction}, CP: ${inputValue.postalCode}`
        : "",
  };

  console.log("formData", notionInfo.productChange);
  console.log("fullInfo", fullInfo);

  const handleSubmitToNotion = async () => {
    setOpenModal(false);
    try {
      await dispatch(onSendDataToNotion(fullInfo));
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
        paragraph={
          valueSelect === "1" && selectedValue === "1"
            ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Solo necesitamos que nos mandes una foto de lo que recibiste, incluyendo todos los productos y piezas que venían en la caja.\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
            : valueSelect === "1" && selectedValue === "2"
            ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Adjuntanos las siguientes &&imágenes del producto que recibiste&& demás para poder avanzar:\n
            1. Etiquetas con QR que se encuentran en la caja.\n
            2. Si el producto sigue en caja, una foto donde se vea cerrada con la cinta de seguridad.\n
            3. Si ya sacaste el producto de la caja, mandanos foto del producto, frente y dorso.`
            : valueSelect === "1" && selectedValue === "3"
            ? `Gracias por la información. ¡Ya estás en el último paso!\n
            Adjuntanos las siguientes &&imágenes del producto que recibiste&& para poder avanzar:\n
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
        loading={loadingNotion}
        button
        send
        value={images.length > 0 ? false : true}
      >
        {valueSelect === "2" ||
        valueSelect === "3" ||
        fullInfo.typeRequest.includes("Cambio") ||
        fullInfo.typeRequest.includes("Devolucion") ? (
          <>
            <Paragraph fontSize="20px">
              Por último, ¿la dirección de retiro es la misma que la de entrega?
            </Paragraph>
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
        arrImages={images.map((image) => image.url!)}
      />
    </>
  );
};

export default Step4;
