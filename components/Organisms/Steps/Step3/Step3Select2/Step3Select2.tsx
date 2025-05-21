import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React from "react";
import items from "../refundItems.json";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import Paragraph from "@/components/Atoms/Typography/Text";
import { Step3Select2and3Props } from "../types";
import { itemsFilterJson, mapOrdersWithSpan } from "../../util";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import { IArrayButton } from "@/components/Organisms/Modals/ModalStep/types";
import Step3Select3 from "./Step3Select3";
import { IgetProducts } from "@/state/products/types";
import { title } from "process";

const Step3Select2 = ({
  orders,
  checkboxConfirmed,
  checkSeleccionado,
  valueSelect,
  handleEditCheckbox,
  handleCheckboxChange,
  handleCheckboxChangeConfirmed,
  infoStep,
  selectedTitles,
  setSelectedTitles,
  setConfirmedValue,
  modalOpen,
  setModalOpen,
  handleConfirmCheckbox,
  products,
  resultadoFinal,
  idVariation,
  setIdVariation,
  idVariationChange,
  setIdVariationChange,
  productsLoading,
  setSelectedTitleObjects,
  setSkuChild,
}: Step3Select2and3Props) => {
  const newOrders = mapOrdersWithSpan(orders);
  const matchedItems = itemsFilterJson(items, newOrders);

  const paragraphArray = [
    {
      id: 1,
      text: (
        <Paragraph>
          Sabemos que encontrar el producto perfecto puede llevar tiempo, y
          queremos ayudarte a que des con la mejor opción para vos.
        </Paragraph>
      ),
    },
    {
      id: 2,
      text:
        selectedTitles.length === 1 &&
        resultadoFinal &&
        resultadoFinal.length === 1 ? (
          <Paragraph font="bold">
            🔍 En base a lo que buscás, creemos que{" "}
            {`${resultadoFinal.map((r) => r.productName).join(", ")}`} puede ser
            una mejor alternativa.
          </Paragraph>
        ) : (
          <Paragraph font="bold">
            🔄 ¿Sabías que podés pedir un cambio por cualquier producto de la
            web, sin importar la categoría?
          </Paragraph>
        ),
    },
    {
      id: 3,
      text:
        selectedTitles.length === 1 &&
        resultadoFinal &&
        resultadoFinal.length === 1 ? (
          <Paragraph>
            📌 {`${resultadoFinal.map((r) => r.comentario).join(", ")}`}
          </Paragraph>
        ) : (
          <Paragraph>
            Es más, para facilitarlo, te ofrecemos un <b>5% OFF</b> en el nuevo
            producto, que además cuenta con 30 noches de prueba 🌙
          </Paragraph>
        ),
    },
    {
      id: 4,
      text:
        selectedTitles.length === 1 &&
        resultadoFinal &&
        resultadoFinal.length === 1 ? (
          <Paragraph>
            Para facilitarte el cambio, te ofrecemos un <b>5% OFF</b> en este
            nuevo producto.
          </Paragraph>
        ) : (
          <Paragraph font="bold">¿Te animás al cambio?</Paragraph>
        ),
    },
  ];

  const arrayButton: IArrayButton[] = [
    {
      id: 1,
      text: "Continuemos con la devolución",
      backgroundColor: "lead",
      onClick: () => {
        handleCheckboxChangeConfirmed(
          true,
          "Continuemos con la devolución",
          "",
          ["devolucion"]
        );
        handleConfirmCheckbox && handleConfirmCheckbox();
        setModalOpen && setModalOpen(false);
      },
    },
    {
      id: 2,
      text: "¡Vamos con cambio!",
      backgroundColor: "yellowCalm",
      onClick: () => {
        if (
          selectedTitles.length === 1 &&
          resultadoFinal &&
          resultadoFinal.length === 1
        ) {
          setSelectedTitleObjects &&
            setSelectedTitleObjects((prev) => [
              ...prev,
              {
                title: resultadoFinal[0].child?.name,
                checkId: resultadoFinal[0].child?.id.toString(),
              },
            ]);
          setSkuChild &&
            setSkuChild((prev: { [id: string]: string }) => ({
              ...prev,
              [resultadoFinal[0].child?.id]: resultadoFinal[0].child?.sku,
            }));
          // setSelectedTitles &&
          //   setSelectedTitles([
          //     resultadoFinal && resultadoFinal[0].child?.name,
          //   ]);
          handleCheckboxChangeConfirmed(true, "¡Vamos con cambio!", "", [
            "cambio",
          ]);
          setIdVariationChange &&
            setIdVariationChange((prev) => {
              const next = prev || [];
              return next.includes(Number(resultadoFinal[0].child?.id))
                ? next
                : [...next, Number(resultadoFinal[0].child?.id)];
            });

          handleConfirmCheckbox && handleConfirmCheckbox();
          setConfirmedValue && setConfirmedValue("3");
          setModalOpen && setModalOpen(false);
        } else {
          handleCheckboxChangeConfirmed(true, "¡Vamos con cambio!", "", [
            "cambio",
          ]);
          setConfirmedValue && setConfirmedValue("3");
          setModalOpen && setModalOpen(false);
        }
      },
    },
  ];

  return (
    <>
      {!checkboxConfirmed ? (
        <>
          <StepSelects
            titleParagraph={
              valueSelect === "2"
                ? "Selecciona el o los productos que queres devolver:"
                : "Selecciona el o los productos que queres cambiar:"
            }
            items={matchedItems.length > 0 ? matchedItems : []}
            onCheckboxChange={(isChecked, title, checkId) => {
              handleCheckboxChange(isChecked, title, checkId);
            }}
            idVariation={idVariation}
            setIdVariation={setIdVariation}
          />
          {modalOpen && (
            <ModalSteps
              modalDevChange
              arrayButton={arrayButton}
              handleClose={() => {
                setModalOpen && setModalOpen(false);
              }}
              icon
              productsLoading={productsLoading}
            >
              {paragraphArray.map((item) => (
                <div>{item.text}</div>
              ))}
            </ModalSteps>
          )}
          {checkSeleccionado && valueSelect === "3" && (
            <Step3Select3
              selectedTitles={selectedTitles}
              handleCheckboxChange={handleCheckboxChange}
              products={products as IgetProducts[]}
              idVariationChange={idVariationChange}
              setIdVariationChange={setIdVariationChange}
              productsLoading={productsLoading}
            />
          )}
        </>
      ) : (
        <StepInfo
          info={infoStep}
          onClick={() => {
            handleEditCheckbox();
          }}
        />
      )}
    </>
  );
};

export default Step3Select2;
