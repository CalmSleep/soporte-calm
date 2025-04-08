import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import AccordionUnit from "@/components/Molecules/AccordionUnit/AccordionUnit";
import React, { useLayoutEffect, useRef, useState } from "react";

import StepRadio from "@/components/Molecules/StepBody/StepRadio/StepRadio";
import { PieceItem, PieceList } from "./styled";
import { StepSelectsProps } from "./types";
import useSelects from "./useSelects";

const StepSelects = ({
  titleParagraph,
  checks,
  items,
  radioOptions,
  onCheckboxChange,
  selectedOption,
  setSelectedOption,
}: StepSelectsProps) => {
  const {
    handleAccordionClick,
    activeItem,
    contentHeights,
    selectedRadios,
    contentRefs,
    handleChangeRadio,
    handlePieceCheckboxChange,
    handleInputChange,
    inputValues,
    selectedChecks,
    handleInternalRadioChange,
  } = useSelects({
    onCheckboxChange,
    items,
    radioOptions,
    selectedOption,
    setSelectedOption,
  });

  return (
    <>
      <Paragraph>{titleParagraph}</Paragraph>
      {checks &&
        checks.map((check) => {
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
                onChange={(e) =>
                  onCheckboxChange &&
                  onCheckboxChange(e.target.checked, check.title)
                }
              />
              <Paragraph>{check.title}</Paragraph>
            </div>
          );
        })}
      {items &&
        radioOptions &&
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
                  <StepRadio
                    radioOptions={radioOptions || []}
                    name={`radio-${item.id}`}
                    checked={selectedRadios[item.id]}
                    onChange={(_, value) => handleChangeRadio(item, value)}
                  />

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
      {items &&
        !radioOptions &&
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
                </>
              }
            />
          );
        })}
      {radioOptions && !items && (
        <StepRadio
          radioOptions={radioOptions}
          name="radio-option"
          checked={selectedOption}
          onChange={handleInternalRadioChange}
        />
      )}
    </>
  );
};

export default StepSelects;
