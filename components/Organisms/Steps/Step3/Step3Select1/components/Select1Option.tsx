import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import AccordionUnit from "@/components/Molecules/AccordionUnit/AccordionUnit";
import React, { useLayoutEffect, useRef, useState } from "react";
import { SelectOptionProps } from "../types";
import {
  RadioGroup,
  RadioOption,
  PieceList,
  PieceItem,
} from "../styles/styled";

const Select1Option = ({ onCheckboxChange }: SelectOptionProps) => {
  const checks = [
    {
      id: "1",
      value: "1",
      name: "almohada",
      title: "Alta almohada",
      span: "(65x35cm)",
    },
    {
      id: "2",
      value: "2",
      title: "Colchón Original Plus",
    },
  ];
  const items = [
    {
      id: "1",
      title: "Mesa ratona",
      pieces: [
        { label: "Maderas" },
        { label: "Recuadros", hasInput: true, placeholder: "¿Cuántos?" },
        { label: "Tornillos", hasInput: true, placeholder: "¿Cantidad?" },
        { label: "Otro", hasInput: true, placeholder: "Detallanos acá" },
      ],
    },
    {
      id: "2",
      title: "Base de hierro",
      pieces: [
        { label: "Maderas" },
        { label: "Recuadros", hasInput: true, placeholder: "¿Cuántos?" },
        { label: "Laterales" },
        { label: "Tornillos", hasInput: true, placeholder: "¿Cuántos?" },
        { label: "Herramienta" },
        { label: "Otro", hasInput: true, placeholder: "Detallanos cuál" },
      ],
    },
  ];
  const radioOptions = [
    { value: "completo", label: "Falta este producto completo" },
    { value: "piezas", label: "Falta una o más piezas" },
  ];

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleAccordionClick = (id: string) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };
  const [selectedRadios, setSelectedRadios] = useState<{
    [id: string]: string;
  }>({});
  console.log(selectedRadios);

  const [selectedChecks, setSelectedChecks] = useState<{
    [itemId: string]: string[];
  }>({});
  const [inputValues, setInputValues] = useState<{
    [itemId: string]: { [pieceLabel: string]: string };
  }>({});

  const handlePieceCheckboxChange = (itemId: string, pieceLabel: string) => {
    const current = selectedChecks[itemId] || [];
    const alreadyChecked = current.includes(pieceLabel);
    const updated = alreadyChecked
      ? current.filter((p) => p !== pieceLabel)
      : [...current, pieceLabel];

    setSelectedChecks((prev) => ({
      ...prev,
      [itemId]: updated,
    }));

    const itemTitle = items.find((i) => i.id === itemId)?.title || "";
    const inputsForItem = inputValues[itemId] || {};

    const formatted = updated.length
      ? `${itemTitle} (${updated
          .map((p) => `${p}${inputsForItem[p] ? `x${inputsForItem[p]}` : ""}`)
          .join(", ")})`
      : itemTitle;

    onCheckboxChange(updated.length > 0, formatted);
  };

  const handleInputChange = (
    itemId: string,
    pieceLabel: string,
    value: string
  ) => {
    setInputValues((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [pieceLabel]: value,
      },
    }));

    const checkedPieces = selectedChecks[itemId] || [];
    const updatedValues = {
      ...(inputValues[itemId] || {}),
      [pieceLabel]: value,
    };

    const itemTitle = items.find((i) => i.id === itemId)?.title || "";

    const formatted = checkedPieces.length
      ? `${itemTitle} (${checkedPieces
          .map((p) => `${p}${updatedValues[p] ? `x${updatedValues[p]}` : ""}`)
          .join(", ")})`
      : itemTitle;

    onCheckboxChange(checkedPieces.length > 0, formatted);
  };

  const contentRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  const [contentHeights, setContentHeights] = useState<{
    [id: string]: number;
  }>({});

  useLayoutEffect(() => {
    if (activeItem && contentRefs.current[activeItem]) {
      const scrollHeight = contentRefs.current[activeItem]!.scrollHeight;
      setContentHeights((prev) => ({ ...prev, [activeItem]: scrollHeight }));
    }
  }, [activeItem, selectedRadios, selectedChecks, inputValues]);

  return (
    <>
      <Paragraph>Seleccioná el producto o las piezas faltantes:</Paragraph>
      {checks.map((check) => {
        return (
          <div key={check.id} className="flex">
            <Input
              appearance="none"
              width="14px"
              height="14px"
              padding="6px"
              borderRadius="2px"
              checkBorderColor="yellowCalm"
              checkColor="yellowCalm"
              borderColorFocused="yellowCalm"
              color="yellowCalm"
              type="checkbox"
              name={check.name}
              value={check.value}
              onChange={(e) => onCheckboxChange(e.target.checked, check.title)}
            />
            <Paragraph>{check.title}</Paragraph>
          </div>
        );
      })}
      {items &&
        items.map((item) => {
          return (
            <AccordionUnit
              titleStyle={{
                font: "regular",
                fontSize: "16px",
                lineHeight: "-0.48px",
              }}
              key={item.id}
              itemName={item.title}
              onClick={() => handleAccordionClick(item.id)}
              isActive={activeItem === item.id}
              contentHeight={contentHeights[item.id] || 0}
              refContent={(el: HTMLDivElement | null) => {
                contentRefs.current[item.id] = el;
              }}
              itemsSelect={
                <>
                  <RadioGroup>
                    {radioOptions.map((option) => (
                      <RadioOption key={option.value}>
                        <Input
                          appearance="none"
                          width="14px"
                          height="14px"
                          padding="0px"
                          checkBorderColor="yellowCalm"
                          checkColor="yellowCalm"
                          borderColorFocused="yellowCalm"
                          color="yellowCalm"
                          type="radio"
                          name={`radio-${item.id}`}
                          value={option.value}
                          checked={selectedRadios[item.id] === option.value}
                          onChange={() => {
                            setSelectedRadios((prev) => ({
                              ...prev,
                              [item.id]: option.value,
                            }));

                            if (option.value === "completo") {
                              onCheckboxChange(true, item.title);
                            } else if (option.value === "piezas") {
                              onCheckboxChange(false, item.title);
                            }
                          }}
                        />
                        {option.label}
                      </RadioOption>
                    ))}
                  </RadioGroup>

                  {selectedRadios[item.id] === "piezas" && (
                    <PieceList>
                      {item.pieces.map((piece) => (
                        <PieceItem key={piece.label}>
                          <Input
                            appearance="none"
                            width="12px"
                            height="12px"
                            padding="5px"
                            borderRadius="2px"
                            checkBorderColor="yellowCalm"
                            checkColor="yellowCalm"
                            borderColorFocused="yellowCalm"
                            color="yellowCalm"
                            type="checkbox"
                            checked={(selectedChecks[item.id] || []).includes(
                              piece.label
                            )}
                            onChange={() =>
                              handlePieceCheckboxChange(item.id, piece.label)
                            }
                          />
                          {piece.label}
                          {piece.hasInput && (
                            <Input
                              appearance="none"
                              width="236px"
                              height="16px"
                              type="text"
                              placeholder={piece.placeholder}
                              value={inputValues[item.id]?.[piece.label] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  piece.label,
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </PieceItem>
                      ))}
                    </PieceList>
                  )}
                </>
              }
            />
          );
        })}
    </>
  );
};

export default Select1Option;
