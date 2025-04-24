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

  console.log(
    "selectedTitles:",
    selectedTitles.map((str) => {
      const match = str.match(/^(.*?)\s*\(([^)]+)\)$/);
      const producto = match ? match[1].trim() : "";
      const comentario = match ? match[2].trim() : "";
      return {
        producto,
        comentario,
      };
    })
  );

  const resultadoFinal: Resultado[] = selectedTitles
    .map((str) => {
      const match = str.match(/^(.*?)\s*\(([^)]+)\)$/);
      const producto = match ? match[1].trim() : "";
      const comentario = match ? match[2].trim() : "";

      const normalize = (s: string) =>
        s
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

      const item = infoChanges.find((d) =>
        normalize(d.title).includes(normalize(producto))
      );
      console.log("🟡 Producto:", producto);
      console.log("🟡 Comentario:", comentario);
      console.log("🟡 Item:", item);

      if (!item) {
        console.log("❌ No se encontró item para:", producto);
        return null;
      }

      const valueMatch = item.values.find((obj) =>
        Object.keys(obj).some((key) => normalize(key) === normalize(comentario))
      );

      if (!valueMatch) {
        console.log("❌ No se encontró comentario para:", comentario);
        return null;
      }

      const comentarioKey = Object.keys(valueMatch).find(
        (key) => normalize(key) === normalize(comentario)
      );

      if (!comentarioKey) return null;

      const value = valueMatch[comentarioKey];
      return {
        productName: value[0],
        comentario: value[1],
      };
    })
    .filter((item): item is Resultado => item !== null);

  console.log(
    "resultadoFinal",
    resultadoFinal.map((r) => r.comentario),
    resultadoFinal.length === 1
  );
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
              icon
            >
              {paragraphArray.map((item) => (
                <div>{item.text}</div>
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
