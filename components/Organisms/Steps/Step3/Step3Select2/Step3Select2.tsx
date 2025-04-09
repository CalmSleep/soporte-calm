import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React, { useState } from "react";
import items from "../refundItems.json";
import StepInfo from "@/components/Molecules/StepBody/StepInfo/StepInfo";
import Paragraph from "@/components/Atoms/Typography/Text";
import { Step3Select2Props } from "../types";

const Step3Select2 = ({
  checkboxConfirmed,
  checkSeleccionado,
  selectedTitles,
  handleEditCheckbox,
  handleCheckboxChange,
  handleCheckboxChangeConfirmed,
}: Step3Select2Props) => {
  const [selectedOption2, setSelectedOption2] = useState("");
  const itemsTest = [items[0], items[1]];
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
      text: "🔍 En base a lo que buscás, creemos que [nombre del producto recomendado] puede ser una mejor alternativa.",
      text2:
        "📌 [Explicación de porqué es más adecuado: características, diferencias, beneficios]",
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
            titleParagraph="Selecciona el o los productos que queres devolver:"
            // items={items}
            items={itemsTest}
            onCheckboxChange={handleCheckboxChange}
          />
          {checkSeleccionado && (
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
        </>
      ) : (
        <StepInfo
          info={[`${selectedTitles.join(", ")}`]}
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
