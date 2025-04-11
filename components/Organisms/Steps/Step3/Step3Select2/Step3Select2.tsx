import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React, { useState } from "react";
import items from "../refundItems.json";
import itemsChanges from "../changesItems.json";
import infoChanges from "../changesOptionItems.json";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import Paragraph from "@/components/Atoms/Typography/Text";
import { Step3Select2and3Props } from "../types";
import { itemsFilterJson, mapOrdersWithSpan, normalizeText } from "../../util";
import { menuData } from "@/components/Organisms/NavBar/utils";

type ValueObject = {
  [key: string]: string[];
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
}: Step3Select2and3Props) => {
  const newOrders = mapOrdersWithSpan(orders);
  const matchedItems = itemsFilterJson(items, newOrders);
  console.log("selectedTitles", selectedTitles);
  type ValueObject = {
    [comentario: string]: string[];
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

  const comentarios: string[] = ["Almohada Inteligente (Me parece alta)"];

  const resultadoFinal: Resultado[] = selectedTitles
    .map((str) => {
      const producto = str.split(" (")[0];
      console.log("producto", producto);

      const match = str.match(/\(([^)]+)\)/);
      const comentario = match ? match[1] : "";

      const item = infoChanges.find((d) => d.title === producto);
      if (!item) return null;

      const valueMatch = item.values.find((obj) => comentario in obj);
      if (!valueMatch) return null;

      const value = valueMatch[comentario as keyof typeof valueMatch];
      console.log("value", value);

      return {
        productName: value[0],
        comentario: value[1],
      };
    })
    .filter((item) => item !== null);

  console.log("resultadoFinal", resultadoFinal);

  const [selectedOption2, setSelectedOption2] = useState("");
  const radioOptions = [
    { value: "cambio", label: "¡Vamos con cambio!" },
    { value: "devolucion", label: "Continuemos con la devolución" },
  ];
  const paragraphArray = [
    {
      id: 1,
      text: " Sabemos que encontrar el producto perfecto puede llevar tiempo, yqueremos ayudarte a que des con la mejor opción para vos. Parafacilitarte el cambio, te ofrecemos un 5% OFF en este nuevo producto.",
    },
    {
      id: 2,
      text: `🔍 En base a lo que buscás, creemos que ${resultadoFinal
        .map((r) => r.productName)
        .join(", ")} puede ser una mejor alternativa.`,
      text2: `📌 ${resultadoFinal.map((r) => r.comentario).join(", ")}` || "",
    },
    {
      id: 3,
      text: "Para facilitarte el cambio, te ofrecemos un 5% OFF en este nuevo producto.",
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
          {checkSeleccionado && valueSelect === "2" && (
            <>
              {paragraphArray.map((item) => (
                <Paragraph key={item.id}>
                  {item.text} <br /> {item.text2}
                </Paragraph>
              ))}

              <StepSelects
                titleParagraph="Seleccioná una opción:"
                radioOptions={radioOptions}
                onCheckboxChange={(isChecked, title) =>
                  handleCheckboxChangeConfirmed(
                    isChecked,
                    title,
                    radioOptions.map((r) => r.label)
                  )
                }
                selectedOption={selectedOption2}
                setSelectedOption={setSelectedOption2}
              />
            </>
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
            setSelectedOption2("");
          }}
        />
      )}
    </>
  );
};

export default Step3Select2;
