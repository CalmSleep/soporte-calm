import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import useValueSelect from "@/hooks/useValueSelect";
import rawInfoChanges from "./changesOptionItems.json";
import Step3Select1 from "./Step3Select1/Step3Select1";
import { ProductoData, Step3Props } from "./types";
import Step3Select2 from "./Step3Select2/Step3Select2";
import Step4 from "../Step4/Step4";
import { useDispatch, useSelector } from "react-redux";
import { getThankuContent } from "@/state/order/orderSelector";
import optionStep3 from "./step3.json";
import {
  getResultados,
  itemsFilterJson,
  mapOrdersWithSpan,
  selectedTitleOthers,
  splitDevolucion,
  splitQuieroComprar,
} from "../util";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { getAllProductsData } from "@/state/products/productsSelector";
import { onGetAllProducts } from "@/state/products/productsActions";
import { getLoadingGetProducts } from "@/state/loading/loadingSelector";
import {
  infoParagraphStep3,
  infoSelect1,
  infoSelect2And,
  infoTitleStep3,
  titlesProducts,
} from "../infoStep";
const Step3 = ({ valueSelect, setConfirmedValue }: Step3Props) => {
  const {
    selectedValue,
    selectedTitles,
    setSelectedTitles,
    handleOnchangeWithoutConfirm,
    handleConfirmCheckbox,
    checkSeleccionado,
    handleCheckboxChange,
    checkboxConfirmed,
    handleEditCheckbox,
    handleCheckboxChangeConfirmed,
    handlePaymentChange,
    notionInfo,
    setNotionInfo,
    checkClickCount,
    selectedTitleObjects,
    setSelectedTitleObjects,
    skuChild,
    setSkuChild,
  } = useValueSelect();

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const orders = useSelector(getThankuContent);
  const dispatch = useDispatch();
  const allProducts = useSelector(getAllProductsData);
  const productsLoading = useSelector(getLoadingGetProducts);

  React.useEffect(() => {
    const productsData = async () => {
      await dispatch(onGetAllProducts());
    };
    productsData();
  }, []);

  const quatityItems = selectedTitleObjects.map((item) => ({
    ...item,
    quantity: checkClickCount[item.checkId] || 1,
    skuChange: skuChild[item.checkId] || "",
  }));

  const infoChanges = rawInfoChanges as unknown as ProductoData[];
  const newOrders = mapOrdersWithSpan(orders.items);
  const matchedItemChange = itemsFilterJson(infoChanges, newOrders);

  const resultadoFinal = getResultados(
    titlesProducts(quatityItems),
    matchedItemChange,
    selectedTitleObjects.map((item) => item.checkId),
    allProducts
  );

  const keywords = ["Otro", "Recuadros", "Tornillos", "Tarugos"];

  const hasIncompleteRequiredInputs = titlesProducts(quatityItems).some(
    (title) => {
      return keywords.some((keyword) => {
        // Coincide con: "Otro x algo" (donde algo es un número, palabra, etc.)
        const regex = new RegExp(`${keyword}\\s*x\\s*[^,\\)]+`, "i");

        const keywordPresent = title.includes(keyword);
        const keywordWithXPresent = regex.test(title);

        // Si la palabra está, pero no tiene "x valor" → inválido
        return keywordPresent && !keywordWithXPresent;
      });
    }
  );

  React.useEffect(() => {
    setNotionInfo({
      ...notionInfo,
      problemDescription:
        valueSelect === "1" || valueSelect === "2" || valueSelect === "3"
          ? infoSelect1(
              valueSelect,
              selectedValue as string,
              quatityItems,
              selectedTitles,
              optionStep3
            )
          : selectedTitles.some((title) => title.includes("cambio"))
          ? ["cambio"]
          : [],
    });
  }, [checkboxConfirmed]);

  return (
    <>
      <StepsHeaders
        span="Paso 3/4 - "
        backgroundColor={!checkboxConfirmed ? "drWhite" : "white"}
        padding={
          !selectedValue && valueSelect === "1" ? "40px 300px 155px" : ""
        }
        title={infoTitleStep3(valueSelect as string)}
        paragraph={
          !checkboxConfirmed ? infoParagraphStep3(valueSelect as string) : ""
        }
        onClick={() => {
          if (valueSelect === "2" && titlesProducts(quatityItems).length > 0) {
            setModalIsOpen(true);
          } else {
            handleConfirmCheckbox();
          }
        }}
        value={
          hasIncompleteRequiredInputs
            ? true
            : valueSelect === "1"
            ? !selectedValue || !checkSeleccionado
            : valueSelect === "2"
            ? !checkSeleccionado
            : !(valueSelect === "3" && titlesProducts(quatityItems).length > 1)
        }
        button={
          valueSelect === "1"
            ? !!selectedValue && !checkboxConfirmed
            : valueSelect === "2"
            ? !checkboxConfirmed
            : valueSelect === "3"
            ? !checkboxConfirmed
            : false
        }
      >
        {valueSelect === "1" ? (
          <Step3Select1
            orders={
              orders.items.length > 0 ? (
                orders.items
              ) : (
                <SkeletonLoader
                  height="15px"
                  width="120px"
                  borderRadius="1000px"
                />
              )
            }
            valueSelect={valueSelect}
            handleCheckboxChange={handleCheckboxChange}
            handleOnchangeWithoutConfirm={handleOnchangeWithoutConfirm}
            selectedValue={selectedValue}
            handleEditCheckbox={handleEditCheckbox}
            selectedTitles={selectedTitles}
            checkboxConfirmed={checkboxConfirmed}
            handleCheckboxChangeConfirmed={handleCheckboxChangeConfirmed}
            handlePaymentChange={handlePaymentChange}
            infoStep={infoSelect1(
              valueSelect,
              selectedValue as string,
              quatityItems,
              selectedTitles,
              optionStep3
            )}
          />
        ) : (
          <Step3Select2
            resultadoFinal={resultadoFinal}
            orders={
              orders.items.length > 0 ? (
                orders.items
              ) : (
                <SkeletonLoader
                  height="15px"
                  width="120px"
                  borderRadius="1000px"
                />
              )
            }
            checkboxConfirmed={checkboxConfirmed}
            handleEditCheckbox={handleEditCheckbox}
            selectedTitles={titlesProducts(quatityItems)}
            handleCheckboxChange={handleCheckboxChange}
            handleCheckboxChangeConfirmed={handleCheckboxChangeConfirmed}
            checkSeleccionado={checkSeleccionado}
            valueSelect={valueSelect}
            infoStep={infoSelect2And(
              valueSelect as string,
              quatityItems,
              selectedTitles
            )}
            modalOpen={modalIsOpen}
            setModalOpen={setModalIsOpen}
            setSelectedTitles={setSelectedTitles}
            setConfirmedValue={setConfirmedValue}
            handleConfirmCheckbox={handleConfirmCheckbox}
            products={allProducts}
            productsLoading={productsLoading}
            setSelectedTitleObjects={setSelectedTitleObjects}
            setSkuChild={setSkuChild}
          />
        )}
      </StepsHeaders>
      {checkboxConfirmed && (
        <Step4
          valueSelect={valueSelect || ""}
          selectedValue={selectedValue || ""}
          notionInfo={notionInfo}
          selectedTitleObjects={quatityItems}
        />
      )}
    </>
  );
};

export default Step3;
