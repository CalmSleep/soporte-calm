import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import AccordionUnit from "@/components/Molecules/AccordionUnit/AccordionUnit";
import React, { useLayoutEffect, useRef, useState } from "react";

import StepRadio from "@/components/Molecules/StepBody/StepRadio/StepRadio";
import {
  CointainCheckbox,
  CointainText,
  ContainerCheckLabel,
  PieceItem,
  PieceItems,
  PieceList,
} from "./styled";
import { StepSelectsProps } from "./types";
import useSelects from "./useSelects";
import { getMatchingQuizzIds } from "@/components/Organisms/Steps/util";
import { RadioGroup } from "../StepRadio/styled";

const StepSelects = ({
  titleParagraph,
  checks,
  items,
  products,
  radioOptions,
  onCheckboxChange,
  selectedOption,
  setSelectedOption,
  changedOption,
  menuData,
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
    handlePieceRadioChange,
    handleRadioInputChange,
  } = useSelects({
    onCheckboxChange,
    items,
    radioOptions,
    selectedOption,
    setSelectedOption,
  });
  const [quizzActive, setQuizzActive] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState<undefined | string>();

  const quizzHandle = (quizzId?: string) => {
    setQuizzActive(!quizzActive);
    quizzId && setSelectedQuizz(quizzId);
  };

  return (
    <>
      <Paragraph fontSize="20px">{titleParagraph}</Paragraph>
      {checks &&
        checks.map((check) => {
          return (
            <CointainCheckbox key={check.id}>
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
                  onCheckboxChange(
                    e.target.checked,
                    `${check.title} ${check.span ? `(${check.span})` : ""}`
                  )
                }
              />
              <CointainText>
                <Paragraph
                  fontSize="16px"
                  responsiveMobile={{
                    fontSize: "14px",
                  }}
                >
                  {check.title}
                </Paragraph>
                {check.span && (
                  <Paragraph fontSize="14px" color="millionGray">
                    ({check.span})
                  </Paragraph>
                )}
              </CointainText>
            </CointainCheckbox>
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
              spamName={`(${item.span})`}
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
                        <ContainerCheckLabel>
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
                          </PieceItem>
                          {piece.hasInput && (
                            <Input
                              fontSize="12px"
                              borderRadius="0px"
                              borderBottom="2px solid #ccc"
                              //  borderColor="millionGray"
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
                        </ContainerCheckLabel>
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
              spamName={item.span ? `(${item.span})` : ""}
              onClick={() => handleAccordionClick(item.id)}
              isActive={activeItem === item.id}
              contentHeight={contentHeights[item.id] || 0}
              refContent={(el: HTMLDivElement | null) => {
                contentRefs.current[item.id] = el;
              }}
              itemsSelect={
                item.pieces ? (
                  <>
                    {item.pieces.map((piece) => (
                      <ContainerCheckLabel>
                        <PieceItem key={piece.label}>
                          <StepRadio
                            radioOptions={[
                              { value: piece.label, label: piece.label },
                            ]}
                            name={`radio-group-${item.id}`}
                            checked={selectedRadios[item.id]}
                            onChange={(e, value) =>
                              handlePieceRadioChange(item.id, value)
                            }
                          />
                        </PieceItem>
                        {piece.hasInput &&
                          selectedRadios[item.id] === piece.label && (
                            <Input
                              appearance="none"
                              width="236px"
                              height="16px"
                              type="text"
                              placeholder={piece.placeholder}
                              value={inputValues[item.id]?.[piece.label] || ""}
                              onChange={(e) =>
                                handleRadioInputChange(
                                  item.id,
                                  piece.label,
                                  e.target.value
                                )
                              }
                            />
                          )}
                      </ContainerCheckLabel>
                    ))}
                  </>
                ) : null
              }
              changedOption={changedOption}
              changeText={
                getMatchingQuizzIds([item.title], menuData).length > 0
                  ? "No sé, ¿cuál me recomiendan?"
                  : ""
              }
              quizzActive={quizzActive}
              setQuizzActive={setQuizzActive}
              selectedQuizz={selectedQuizz}
              quizzHandle={() => {
                const ids = getMatchingQuizzIds([item.title], menuData);
                if (ids.length > 0) {
                  quizzHandle(ids[0]);
                } else {
                  console.warn("No quizz found for", item.title);
                }
              }}
            />
          );
        })}
      {products &&
        products.map((item) => {
          return (
            <AccordionUnit
              titleStyle={{
                font: "regular",
                fontSize: "16px",
                lineHeight: "-0.48px",
              }}
              key={item.name_category}
              itemName={
                item.name_category.charAt(0).toUpperCase() +
                item.name_category.slice(1).toLowerCase()
              }
              onClick={() => handleAccordionClick(item.name_category)}
              isActive={activeItem === item.name_category}
              contentHeight={contentHeights[item.name_category] || 0}
              refContent={(el: HTMLDivElement | null) => {
                contentRefs.current[item.name_category] = el;
              }}
              itemsSelect={
                <>
                  {item.products.map((product) => (
                    <p>{product.name}</p>
                  ))}
                </>
              }
              changedOption={changedOption}
              changeText={
                getMatchingQuizzIds([item.name_category], menuData).length > 0
                  ? "No sé, ¿cuál me recomiendan?"
                  : ""
              }
              quizzActive={quizzActive}
              setQuizzActive={setQuizzActive}
              selectedQuizz={selectedQuizz}
              quizzHandle={() => {
                const ids = getMatchingQuizzIds([item.name_category], menuData);
                if (ids.length > 0) {
                  quizzHandle(ids[0]);
                } else {
                  console.warn("No quizz found for", item.name_category);
                }
              }}
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
