import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import AccordionUnit from "@/components/Molecules/AccordionUnit/AccordionUnit";
import FrequentQuestions from "@/components/Organisms/FrequentQuestions/FrequentQuestions";
import { DivAccordionUnit } from "@/components/Organisms/FrequentQuestions/styled";
import React, { useState } from "react";

const Select1Option = () => {
  const items = [
    {
      id: "1",
      title: "Mesa ratona",
      description: [
        {
          name: "mesa",
          value: "",
          description: "Falta este producto completo",
        },
        {
          name: "mesa",
          value: "",
          description: "Falta una o más piezas",
        },
      ],
    },
    {
      id: "2",
      title: "Mesa de arrime",
    },
    {
      id: "3",
      title: "Base de hierro",
      description: [
        {
          name: "mesa",
          value: "",
          description: "Falta este producto completo",
        },
        {
          name: "mesa",
          value: "",
          description: "Falta una o más piezas",
          moreOption: ["Maderas", "Recuadros"],
        },
      ],
    },
  ];
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const handleClick = (title: string) => {
    setActiveItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };
  return (
    <>
      <Paragraph>Seleccioná el producto o las piezas faltantes:</Paragraph>
      <div className="flex">
        <Input width="16px" type="checkbox" color="mangoTango" height="16px" />
        <Paragraph>Alta almohada (65x35cm)</Paragraph>
      </div>
      <div className="flex">
        <Input width="16px" type="checkbox" color="mangoTango" height="16px" />
        <Paragraph>Alta almohada (65x35cm)</Paragraph>
      </div>

      {items &&
        items.map((item, index) => {
          let isActive = activeItems.includes(item.title);
          return (
            <AccordionUnit
              key={item.id}
              onClick={() => handleClick(item.title)}
              itemName={item.title}
              itemsSelect={
                item.description &&
                Array.isArray(item.description) &&
                item.description.map((item) => (
                  <>
                    <fieldset className="flex-2">
                      <label>
                        <input
                          type="radio"
                          name={item.name}
                          value={item.value}
                        />
                        {item.description}
                      </label>
                    </fieldset>
                    {item.moreOption &&
                      item.moreOption.map((item) => (
                        <div className="flex">
                          <Input
                            width="16px"
                            type="checkbox"
                            color="mangoTango"
                            height="16px"
                          />
                          <Paragraph>{item}</Paragraph>
                        </div>
                      ))}
                  </>
                ))
              }
              isActive={isActive}
              isLastUnit={index === items.length - 1}
            />
          );
        })}
      <div className="flex">
        <Input width="16px" type="checkbox" color="mangoTango" height="16px" />
        <Paragraph>Colchón Original Plus (140x190cm)</Paragraph>
      </div>
    </>
  );
};

export default Select1Option;
