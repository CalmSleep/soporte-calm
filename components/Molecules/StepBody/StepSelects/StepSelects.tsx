import Input from "@/components/Atoms/Input/Input";
import Paragraph from "@/components/Atoms/Typography/Text";
import AccordionUnit from "@/components/Molecules/AccordionUnit/AccordionUnit";
import React, { useLayoutEffect, useRef, useState } from "react";

import StepRadio from "@/components/Molecules/StepBody/StepRadio/StepRadio";
import {
  AcordeonProducts,
  CointainAcordeonProducts,
  CointainAcordeonRadio,
  CointainCheckbox,
  CointainText,
  ContainerCheckLabel,
  PieceItem,
  PieceItems,
  PieceList,
  SelectableDiv,
} from "./styled";
import { StepSelectsProps } from "./types";
import useSelects from "./useSelects";
import { getMatchingQuizzIds } from "@/components/Organisms/Steps/util";
import { RadioGroup } from "../StepRadio/styled";

import CardProducts from "../../CardRelatedProductsATC/CardProducts";
import ProductProps from "@/components/Organisms/ProductProps/ProductProps";
import { IChildrenProd } from "@/state/products/types";
import Quizz from "../../Quizz/Quizz";
import { set } from "date-fns";
import { atrrToRender } from "@/utils/productsFunctios";
import { ShelfConfiguratorContainer } from "@/components/Organisms/MainBlock/styled";
import ShelfPreconfigurations from "@/components/Organisms/ShelfConfigurator/ShelfPreconfigurations";

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
  selectedTitle,
  idVariation,
  setIdVariation,
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
    selectedProductNames,
    handleProductCheckboxChange,
    selectedChild,
    setSelectedChild,
    shelfConfigurations,
    setShelfConfigurations,
    setIsColorChange,
    setIsSizeChange,
    handleCheckboxArrayChange,
    setIsShelfConfigChanged,
  } = useSelects({
    selectedTitle,
    onCheckboxChange,
    items,
    radioOptions,
    setSelectedOption,
    idVariation,
    setIdVariation,
  });
  const [quizzActive, setQuizzActive] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState<undefined | string>();
  const [selectedGroup, setSelectedGroup] = useState<
    IChildrenProd[] | undefined
  >();
  // console.log("selectedGroup", selectedGroup);
  //console.log("selectedProductNames", selectedProductNames);
  //console.log("selectedChild", selectedChild);
  const defaultProds = React.useMemo(() => [], []);

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
                onChange={(e) => {
                  onCheckboxChange &&
                    onCheckboxChange(
                      e.target.checked,
                      `${check.title} ${check.span ? `(${check.span})` : ""}`,
                      String(check.id)
                    );

                  if (setIdVariation) {
                    setIdVariation((prev) =>
                      handleCheckboxArrayChange({
                        prev,
                        isChecked: e.target.checked,
                        id: Number(check.id),
                      })
                    );
                  }
                }}
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
        items.map((item, index) => {
          const uniqueKey = `${item.id}-${index}`;
          return (
            <AccordionUnit
              titleStyle={{
                font: "regular",
                fontSize: "16px",
                lineHeight: "-0.48px",
              }}
              key={uniqueKey}
              itemName={item.title}
              spamName={`(${item.span})`}
              onClick={() => handleAccordionClick(uniqueKey)}
              isActive={activeItem === uniqueKey}
              contentHeight={contentHeights[uniqueKey] || 0}
              height={contentHeights[uniqueKey] || 0}
              refContent={(el: HTMLDivElement | null) => {
                contentRefs.current[uniqueKey] = el;
              }}
              itemsSelect={
                <CointainAcordeonRadio>
                  <StepRadio
                    radioOptions={radioOptions || []}
                    name={`radio-${uniqueKey}`}
                    checked={selectedRadios[uniqueKey]}
                    onChange={(_, value) =>
                      handleChangeRadio({ ...item, id: uniqueKey }, value)
                    }
                  />

                  {selectedRadios[uniqueKey] === "piezas" && (
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
                              onChange={() =>
                                handlePieceCheckboxChange(
                                  uniqueKey,
                                  piece.label
                                )
                              }
                              checked={(
                                selectedChecks[uniqueKey] || []
                              ).includes(piece.label)}
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
                              value={
                                inputValues[uniqueKey]?.[piece.label] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  uniqueKey,
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
                </CointainAcordeonRadio>
              }
            />
          );
        })}
      {items &&
        !radioOptions &&
        items.map((item, index) => {
          const uniqueKey = `${item.id}-${index}`;
          return (
            <AccordionUnit
              titleStyle={{
                font: "regular",
                fontSize: "16px",
                lineHeight: "-0.48px",
              }}
              key={uniqueKey}
              itemName={item.title}
              spamName={item.span ? `(${item.span})` : ""}
              onClick={() => handleAccordionClick(uniqueKey)}
              isActive={activeItem === uniqueKey}
              contentHeight={contentHeights[uniqueKey] || 0}
              height={contentHeights[uniqueKey] || 0}
              refContent={(el: HTMLDivElement | null) => {
                contentRefs.current[uniqueKey] = el;
              }}
              itemsSelect={
                item.pieces ? (
                  <CointainAcordeonRadio>
                    {item.pieces.map((piece) => (
                      <ContainerCheckLabel>
                        <PieceItem key={piece.label}>
                          <StepRadio
                            radioOptions={[
                              { value: piece.label, label: piece.label },
                            ]}
                            name={`radio-group-${uniqueKey}`}
                            checked={selectedRadios[uniqueKey]}
                            onChange={(e, value) =>
                              handlePieceRadioChange(uniqueKey, value)
                            }
                          />
                        </PieceItem>
                        {piece.hasInput &&
                          selectedRadios[uniqueKey] === piece.label && (
                            <Input
                              appearance="none"
                              width="236px"
                              height="16px"
                              type="text"
                              placeholder={piece.placeholder}
                              value={
                                inputValues[uniqueKey]?.[piece.label] || ""
                              }
                              onChange={(e) =>
                                handleRadioInputChange(
                                  uniqueKey,
                                  piece.label,
                                  e.target.value
                                )
                              }
                            />
                          )}
                      </ContainerCheckLabel>
                    ))}
                  </CointainAcordeonRadio>
                ) : null
              }
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
              height={contentHeights[item.name_category] || 0}
              refContent={(el: HTMLDivElement | null) => {
                contentRefs.current[item.name_category] = el;
              }}
              itemsSelect={
                <CointainAcordeonProducts>
                  {item.products.map((product) => {
                    const cardProductDate = menuData.flatMap((item: any) =>
                      item.columns.flatMap((col: any) => col.products)
                    );
                    const descripcion = cardProductDate.find((item: any) =>
                      item.name
                        .toLowerCase()
                        .includes(product.name.toLowerCase())
                    );
                    let propsNames = atrrToRender(product.children);
                    return (
                      <AcordeonProducts>
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
                          name={product.name}
                          value={product.name}
                          onChange={(e) => {
                            handleProductCheckboxChange(e, product.name);
                          }}
                        />
                        <CardProducts
                          image={product.image_cross_selling}
                          name={product.name}
                          description={descripcion?.description || ""}
                        />
                        {selectedProductNames.includes(product.name) && (
                          <SelectableDiv
                            $selected={
                              selectedProductNames.includes(product.name)
                                ? "true"
                                : undefined
                            }
                            $items={selectedGroup?.length || 0}
                          >
                            <ProductProps
                              selectedGroup={selectedGroup || []}
                              setSelectedGroup={setSelectedGroup}
                              children={product.children}
                              selectedChild={selectedChild}
                              setSelectedChild={setSelectedChild}
                              setIsColorChange={setIsColorChange}
                              setIsSizeChange={setIsSizeChange}
                              defaultProds={defaultProds}
                              propsNames={propsNames}
                              category={item.name_category}
                              idProd={product.id_prod}
                            />
                            {/*   {Number(product.id) === 2411459 ? (
                              <ShelfConfiguratorContainer>
                                <ShelfPreconfigurations
                                  setShelfConfigurations={
                                    setShelfConfigurations
                                  }
                                  shelfConfigurations={shelfConfigurations}
                                  handlePreconfigView={() => {}}
                                  children={product.children}
                                  propsNames={propsNames}
                                  setShelfConfigChanged={
                                    setIsShelfConfigChanged
                                  }
                                />
                               { isShelfPreconfigView ?
                <ShelfPreconfigurations 
                setShelfConfigurations={setShelfConfigurations}
                shelfConfigurations={shelfConfigurations}
                handlePreconfigView={handlePreconfigView}
                children={children}
                propsNames={propsNames}
                setShelfConfigChanged={setIsShelfConfigChanged}
                />
                : (
                  <ShelfConfigurator
                  setShelfConfigurations={setShelfConfigurations}
                  shelfConfigurations={shelfConfigurations}
                  handlePreconfigView={handlePreconfigView}
                  children={children}
                  openModuleId={openModuleId}
                  setOpenModuleId={setOpenModuleId}
                  propsNames={propsNames}
                  addToCartEnabled={addToCartEnabled}
                  setShelfConfigChanged={setIsShelfConfigChanged}
                  isPreConfigModalOpen={isPreConfigModalOpen}
                  setIsPreConfigModalOpen={setIsPreConfigModalOpen}
                  setIsShelfConfigChanged={setIsShelfConfigChanged}
                  />
                )} 
                              </ShelfConfiguratorContainer>
                            ) : (
                              <ProductProps
                                selectedGroup={selectedGroup || []}
                                setSelectedGroup={setSelectedGroup}
                                children={product.children}
                                selectedChild={selectedChild}
                                setSelectedChild={setSelectedChild}
                                setIsColorChange={setIsColorChange}
                                setIsSizeChange={setIsSizeChange}
                                defaultProds={defaultProds}
                                propsNames={propsNames}
                                category={item.name_category}
                                idProd={product.id_prod}
                              />
                            )}
                              */}
                          </SelectableDiv>
                        )}
                      </AcordeonProducts>
                    );
                  })}
                  {changedOption && (
                    <Paragraph
                      color="wildViolet"
                      font="medium"
                      fontSize="16px"
                      onClick={() => {
                        const ids = getMatchingQuizzIds(
                          [item.name_category],
                          menuData
                        );
                        if (ids.length > 0) {
                          quizzHandle(ids[0]);
                        } else {
                          console.warn(
                            "No quizz found for",
                            item.name_category
                          );
                        }
                      }}
                      cursor="pointer"
                      textDecoration="underline"
                    >
                      {getMatchingQuizzIds([item.name_category], menuData)
                        .length > 0
                        ? "No sé, ¿cuál me recomiendan?"
                        : ""}
                    </Paragraph>
                  )}

                  {quizzActive && selectedQuizz && (
                    <Quizz
                      quizzActive={quizzActive}
                      closeHandle={() =>
                        setQuizzActive && setQuizzActive(false)
                      }
                      quizzKey={selectedQuizz}
                    />
                  )}
                </CointainAcordeonProducts>
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
