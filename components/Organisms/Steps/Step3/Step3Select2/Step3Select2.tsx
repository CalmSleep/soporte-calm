import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React, { useState } from "react";
import items from "../refundItems.json";
import itemsChanges from "../changesItems.json";
import rawInfoChanges from "../changesOptionItems.json";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import Paragraph from "@/components/Atoms/Typography/Text";
import { Step3Select2and3Props } from "../types";
import { itemsFilterJson, mapOrdersWithSpan, normalizeText } from "../../util";
import { menuData } from "@/components/Organisms/NavBar/utils";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import { IArrayButton } from "@/components/Organisms/Modals/ModalStep/types";
import { set } from "date-fns";
import { tr } from "date-fns/locale";

type ValueObject = {
  [key: string]: string[];
};

type ProductoData = {
  id: string;
  title: string;
  values: ValueObject[];
};

type Resultado = {
  productName: string;
  comentario: string;
};

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
}: Step3Select2and3Props) => {
  const newOrders = mapOrdersWithSpan(orders);
  const matchedItems = itemsFilterJson(items, newOrders);
  const infoChanges = rawInfoChanges as unknown as ProductoData[];

  // console.log("selectedTitles", selectedTitles);

  const resultadoFinal: Resultado[] = selectedTitles
    .map((str) => {
      const producto = str.split(" (")[0];
      //  console.log("producto", producto);

      const match = str.match(/\(([^)]+)\)/);
      const comentario = match ? match[1] : "";

      const item = infoChanges.find((d) => d.title === producto);
      if (!item) return null;

      //  const valueMatch = item.values.find((obj) => comentario in obj);
      const valueMatch = item.values.find(
        (obj): obj is ValueObject => comentario in obj
      );

      if (!valueMatch) return null;

      const value = valueMatch[comentario];
      //console.log("value", value);

      return {
        productName: value[0],
        comentario: value[1],
      };
    })
    .filter(Boolean) as Resultado[];

  console.log(
    "resultadoFinal",
    resultadoFinal.map((r) => r.productName.length > 0)
  );
  const paragraphArray = [
    {
      id: 1,
      text: "Sabemos que encontrar el producto perfecto puede llevar tiempo, y queremos ayudarte a que des con la mejor opción para vos.",
    },
    {
      id: 2,
      text:
        selectedTitles.length > 1
          ? "🔄 ¿Sabías que podés pedir un cambio por cualquier producto de la web, sin importar la categoría?"
          : `🔍 En base a lo que buscás, creemos que ${resultadoFinal
              .map((r) => r.productName)
              .join(", ")} puede ser una mejor alternativa.`,
      text2:
        selectedTitles.length > 1
          ? "Es más, para facilitarlo, te ofrecemos un 5% OFF en el nuevo producto, que además cuenta con 30 noches de prueba 🌙"
          : `📌 ${resultadoFinal.map((r) => r.comentario).join(", ")}`,
    },
    {
      id: 3,
      text:
        selectedTitles.length > 1
          ? "¿Te animás al cambio?"
          : "Para facilitarte el cambio, te ofrecemos un 5% OFF en este nuevo producto.",
    },
  ];

  //  console.log("selectTitles", selectedTitles);

  const arrayButton: IArrayButton[] = [
    {
      id: 1,
      text: "Continuemos con la devolución",
      backgroundColor: "lead",
      onClick: () => {
        handleCheckboxChangeConfirmed(true, "Continuemos con la devolución", [
          "devolucion",
        ]);
        handleConfirmCheckbox && handleConfirmCheckbox();
        setModalOpen && setModalOpen(false);
      },
    },
    {
      id: 2,
      text: "¡Vamos con cambio!",
      backgroundColor: "yellowCalm",
      onClick: () => {
        console.log("!Vamos con cambio!");
        handleCheckboxChangeConfirmed(true, "¡Vamos con cambio!", ["cambio"]);
        setConfirmedValue && setConfirmedValue("3");
        setSelectedTitles &&
          setSelectedTitles(
            selectedTitles.filter(
              (title) => !title.toLowerCase().includes("cambio")
            )
          );
        setModalOpen && setModalOpen(false);
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
            onCheckboxChange={handleCheckboxChange}
          />
          {modalOpen && (
            <ModalSteps
              modalDevChange
              arrayButton={arrayButton}
              handleClose={() => {
                setModalOpen && setModalOpen(false);
              }}
            >
              {paragraphArray.map((item) => (
                <Paragraph key={item.id}>
                  {item.text}
                  <br /> <br /> {item.text2}
                </Paragraph>
              ))}
            </ModalSteps>
          )}
          {checkSeleccionado && valueSelect === "3" && (
            <StepSelects
              titleParagraph="¿Por qué producto te gustaría hacer el cambio?"
              items={itemsChanges}
              onCheckboxChange={handleCheckboxChange}
              changedOption
              menuData={menuData}
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
