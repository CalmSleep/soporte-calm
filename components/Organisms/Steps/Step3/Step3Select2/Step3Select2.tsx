import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React from "react";
import items from "../refundItems.json";
import rawInfoChanges from "../changesOptionItems.json";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import Paragraph from "@/components/Atoms/Typography/Text";
import { ProductoData, Resultado, Step3Select2and3Props } from "../types";
import { itemsFilterJson, mapOrdersWithSpan, normalizeText } from "../../util";
import ModalSteps from "@/components/Organisms/Modals/ModalStep/ModalSteps";
import { IArrayButton } from "@/components/Organisms/Modals/ModalStep/types";
import Step3Select3 from "./Step3Select3";
import { IgetProducts } from "@/state/products/types";

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
}: Step3Select2and3Props) => {
  const newOrders = mapOrdersWithSpan(orders);
  const matchedItems = itemsFilterJson(items, newOrders);
  const infoChanges = rawInfoChanges as unknown as ProductoData[];
  console.log("orders", orders);

  const resultadoFinal: Resultado[] = selectedTitles
    .map((str) => {
      const match = str.match(/^(.*?)\s*\(([^)]+)\)$/);
      const producto = match ? match[1].trim() : "";
      console.log("producto", producto);

      const comentario = match ? match[2].trim() : "";
      const normalize = (s: string) =>
        s
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

      const attributesOrder = orders.find((order: any) =>
        normalize(order.product_name).includes(producto)
      )?.attributes;
      console.log("attributesOrder", attributesOrder);

      const childrenFull =
        products?.flatMap((p) => p.products).find((p) => p.name === producto)
          ?.children || [];

      const item = infoChanges.find((d) =>
        normalize(d.title).includes(normalize(producto))
      );

      if (!item) return null;

      const valueMatch = item.values.find((obj) =>
        Object.keys(obj).some((key) => normalize(key) === normalize(comentario))
      );

      if (!valueMatch) return null;

      const comentarioKey = Object.keys(valueMatch).find(
        (key) => normalize(key) === normalize(comentario)
      );

      if (!comentarioKey) return null;

      const value = valueMatch[comentarioKey];

      let sku: string | null = null;

      if (value && value[0]) {
        const cleanValueName = value[0].replace(/[()]/g, "").trim();
        const valueName = normalize(cleanValueName);

        const matchChild = childrenFull.find((child) => {
          const normalizedChildName = normalize(child.name);

          const tokens = valueName.split(" ");
          const allTokensMatch = tokens.every((token) =>
            normalizedChildName.includes(token)
          );

          // Extraer todos los atributos relevantes que queremos verificar
          const tamanoValue =
            attributesOrder?.pa_tamano || attributesOrder?.tamano || "";
          const altoValue =
            attributesOrder?.pa_alto || attributesOrder?.alto || "";
          const colorValue =
            attributesOrder?.pa_color || attributesOrder?.color || "";

          // Función auxiliar para comparación flexible de atributos
          const isFlexibleMatch = (
            attributeValue: string,
            targetString: string
          ): boolean => {
            if (!attributeValue) return true; // Si no hay valor para el atributo, asumimos que coincide

            const normalizedAttr = normalize(attributeValue).replace(
              /\s+/g,
              ""
            ); // Eliminar espacios

            const cleanTarget = normalize(targetString).replace(/\s+/g, "");

            // Varios intentos de coincidencia
            return !!(
              cleanTarget.includes(normalizedAttr) ||
              targetString.includes(attributeValue) ||
              // Manejar casos como "2 plazas" vs "2plazas"
              (normalizedAttr.match(/\d+/) &&
                targetString.includes(
                  normalizedAttr.replace(/(\d+)([a-z]+)/, "$1 $2")
                ))
            );
          };

          // Verificar si los atributos están incluidos en el nombre normalizado del hijo
          let tamanoMatch = isFlexibleMatch(tamanoValue, normalizedChildName);
          let altoMatch = isFlexibleMatch(altoValue, normalizedChildName);
          let colorMatch = isFlexibleMatch(colorValue, normalizedChildName);

          // Consideramos también si los atributos del child coinciden con los attributesOrder
          const attributesMatch =
            attributesOrder &&
            Object.entries(attributesOrder).every(([key, val]) => {
              const childAttr = child.attributes?.[key];
              if (!childAttr || !val) return true; // Si alguno es vacío o undefined, asumimos que coincide

              return normalize(childAttr) === normalize(val as string);
            });

          console.log("normalizedChildName", normalizedChildName);
          console.log("tamanoMatch", tamanoMatch, "tamanoValue:", tamanoValue);
          console.log("altoMatch", altoMatch, "altoValue:", altoValue);
          console.log("colorMatch", colorMatch, "colorValue:", colorValue);
          console.log("attributesMatch (exacto)", attributesMatch);
          console.log("allTokensMatch", allTokensMatch);

          // Retornar true solo si todas las condiciones son true
          const finalMatch =
            allTokensMatch && tamanoMatch && altoMatch && colorMatch;

          console.log("finalMatch", finalMatch);

          return finalMatch;
        });
        console.log("matchChild", matchChild);
        sku = matchChild?.sku || null;
      }

      return {
        productName: value?.[0],
        comentario: value?.[1],
        sku,
      };
    })
    .filter((item): item is Resultado => item !== null);

  console.log("resultadoFinal", resultadoFinal);
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
        selectedTitles.length === 1 && resultadoFinal.length === 1 ? (
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
        selectedTitles.length === 1 && resultadoFinal.length === 1 ? (
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
        selectedTitles.length === 1 && resultadoFinal.length === 1 ? (
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
        handleCheckboxChangeConfirmed(true, "¡Vamos con cambio!", ["cambio"]);
        setConfirmedValue && setConfirmedValue("3");
        setSelectedTitles &&
          setSelectedTitles(
            selectedTitles.filter(
              (title) => !title.toLowerCase().includes("cambio")
            )
          );
        setModalOpen && setModalOpen(false);
        // console.log("selectedTitles", selectedTitles);

        // if (selectedTitles.length === 1 && resultadoFinal.length === 1) {
        //   handleCheckboxChangeConfirmed(
        //     true,
        //     `${resultadoFinal
        //       .map((r) => r.productName.replace(/\s*\(([^)]+)\)/, " - $1"))
        //       .join(", ")}`,
        //     ["cambio"]
        //   );
        //   setConfirmedValue && setConfirmedValue("3");
        //   handleConfirmCheckbox && handleConfirmCheckbox();
        //   setModalOpen && setModalOpen(false);
        // } else {
        //   handleCheckboxChangeConfirmed(true, "¡Vamos con cambio!", ["cambio"]);
        //   setConfirmedValue && setConfirmedValue("3");
        //   setSelectedTitles &&
        //     setSelectedTitles(
        //       selectedTitles.filter(
        //         (title) => !title.toLowerCase().includes("cambio")
        //       )
        //     );
        //   setModalOpen && setModalOpen(false);
        // }
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
            <Step3Select3
              selectedTitles={selectedTitles}
              handleCheckboxChange={handleCheckboxChange}
              products={products as IgetProducts[]}
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
