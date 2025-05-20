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
import {
  getAllProductsData,
  getProductsData,
} from "@/state/products/productsSelector";
import {
  onGetAllProducts,
  onGetProduct,
} from "@/state/products/productsActions";
import { getProduct } from "@/state/products/productsServices";
import { getLoadingGetProducts } from "@/state/loading/loadingSelector";
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
    idVariation,
    setIdVariation,
    idVariationChange,
    setIdVariationChange,
    checkClickCount,
    selectedTitleObjects,
    setSelectedTitleObjects,
  } = useValueSelect();
  // console.log("selectedTitles", selectedTitles);
  // console.log("checkClickCount", checkClickCount);
  const quatityItems = selectedTitleObjects.map((item) => ({
    ...item,
    quantity: checkClickCount[item.checkId] || 1,
  }));
  // console.log("selectedTitleObjects", quatityItems);
  const titlesProducts = quatityItems.map(({ title, quantity }) =>
    quantity > 1 ? `${title} x ${quantity}` : title
  );

  //  console.log("titles", !!selectedTitles.find((title) => title.includes("x")));
  // console.log(notionInfo);
  const orders = useSelector(getThankuContent);
  const dispatch = useDispatch();
  const allProducts = useSelector(getAllProductsData);
  // console.log("allProducts", allProducts);
  const productsLoading = useSelector(getLoadingGetProducts);
  // console.log("orders", orders.items);

  React.useEffect(() => {
    const productsData = async () => {
      await dispatch(onGetAllProducts());
    };
    productsData();
  }, []);

  const infoChanges = rawInfoChanges as unknown as ProductoData[];
  const newOrders = mapOrdersWithSpan(orders.items);
  const matchedItemChange = itemsFilterJson(infoChanges, newOrders);

  const resultadoFinal = getResultados(
    titlesProducts,
    matchedItemChange,
    selectedTitleObjects.map((item) => item.checkId),
    allProducts
  );

  //console.log("idVariation", idVariation);
  // console.log("idVariationChange", idVariationChange);

  // console.log("resultadoFinal", resultadoFinal);
  const keywords = ["Otro", "Recuadros", "Tornillos", "Tarugos"];

  const hasIncompleteRequiredInputs = titlesProducts.some((title) => {
    return keywords.some((keyword) => {
      // Coincide con: "Otro x algo" (donde algo es un número, palabra, etc.)
      const regex = new RegExp(`${keyword}\\s*x\\s*[^,\\)]+`, "i");

      const keywordPresent = title.includes(keyword);
      const keywordWithXPresent = regex.test(title);

      // Si la palabra está, pero no tiene "x valor" → inválido
      return keywordPresent && !keywordWithXPresent;
    });
  });

  const [quieroComprar, otros] = splitQuieroComprar(selectedTitles);
  const [continuemos, otros2] = splitDevolucion(selectedTitles);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const infoProduct =
    (valueSelect === "1" && selectedValue === "1") ||
    selectedValue === "4" ||
    selectedValue === "3"
      ? `${selectedTitleOthers(titlesProducts).join(", ")}`
      : valueSelect === "1" && selectedValue === "2" && quieroComprar.length
      ? `${quieroComprar}`
      : "";

  // console.log("infoProduct", infoProduct);

  const infoMensaje =
    valueSelect === "1" && selectedValue === "2" && otros.length > 0
      ? `${otros.join(", ")}`
      : "";

  const infoSelect1 = [
    `${
      optionStep3.find((item) => item.value === selectedValue)?.label ||
      "Opción no encontrada"
    }`,
    infoProduct,
    infoMensaje,
  ];

  const products =
    valueSelect === "2"
      ? titlesProducts.join(", ")
      : `${titlesProducts.filter((title) => !title.includes("-")).join(", ")}`;

  // console.log("valueSelect", valueSelect);

  // console.log("products", products);
  const formattedTitles = titlesProducts
    .filter((title) => title.includes("-"))
    .map((title) => {
      if (title.includes("-")) {
        const [before, after] = title.split(" - ");
        return `${before.trim()} (${after.trim()})`;
      }
      return title;
    });
  console.log("titlesProducts", titlesProducts);

  // console.log("prueba parentesis span: ", formattedTitles.join(", "));

  const infoSelect2And3 = [
    products,
    valueSelect === "2"
      ? `${continuemos.join(", ")}`
      : // : selectedTitles.some((title) => title.includes("cambio"))
        // ? selectedTitles.join(", ")
        formattedTitles.join(", "),
  ];

  React.useEffect(() => {
    setNotionInfo({
      ...notionInfo,
      problemDescription:
        valueSelect === "1"
          ? infoSelect1
          : selectedTitles.some((title) => title.includes("cambio"))
          ? ["cambio"]
          : [],
      productReturn:
        valueSelect === "2"
          ? [`${otros2.join(", ")}`]
          : valueSelect === "3"
          ? [products]
          : [],
      productChange:
        valueSelect === "3" ||
        (valueSelect === "2" &&
          titlesProducts.length === 1 &&
          resultadoFinal &&
          resultadoFinal.length === 1)
          ? titlesProducts.filter((title) => title.includes("-"))
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
        title={
          valueSelect === "1"
            ? "Contanos cuál fue el problema"
            : valueSelect === "2"
            ? "Contanos qué productos querés devolver"
            : valueSelect === "3"
            ? "Contanos qué productos querés cambiar"
            : ""
        }
        paragraph={
          !checkboxConfirmed
            ? valueSelect === "1"
              ? "Si no encontrás tu caso en estas opciones, escribinos y te ayudamos."
              : valueSelect === "2"
              ? "¿Necesitas devolver uno o más productos? ¡No hay problema! Avancemos con la gestión..."
              : "¿Necesitas cambiar uno o más productos? ¡No hay problema! Avancemos con la gestión..."
            : ""
        }
        onClick={() => {
          if (valueSelect === "2" && titlesProducts.length > 0) {
            setModalIsOpen(true);
          } else {
            handleConfirmCheckbox();
          }
        }}
        value={
          hasIncompleteRequiredInputs
            ? true // desactivar el botón
            : valueSelect === "1"
            ? !selectedValue || !checkSeleccionado
            : valueSelect === "2"
            ? !checkSeleccionado
            : !(
                valueSelect === "3" &&
                titlesProducts.some((title) => title.includes("-"))
              )
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
            infoStep={infoSelect1}
            idVariation={idVariation}
            setIdVariation={setIdVariation}
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
            selectedTitles={titlesProducts}
            handleCheckboxChange={handleCheckboxChange}
            handleCheckboxChangeConfirmed={handleCheckboxChangeConfirmed}
            checkSeleccionado={checkSeleccionado}
            valueSelect={valueSelect}
            infoStep={infoSelect2And3}
            modalOpen={modalIsOpen}
            setModalOpen={setModalIsOpen}
            setSelectedTitles={setSelectedTitles}
            setConfirmedValue={setConfirmedValue}
            handleConfirmCheckbox={handleConfirmCheckbox}
            products={allProducts}
            productsLoading={productsLoading}
            idVariation={idVariation}
            setIdVariation={setIdVariation}
            idVariationChange={idVariationChange}
            setIdVariationChange={setIdVariationChange}
            setSelectedTitleObjects={setSelectedTitleObjects}
          />
        )}
      </StepsHeaders>
      {checkboxConfirmed && (
        <Step4
          valueSelect={valueSelect || ""}
          selectedValue={selectedValue || ""}
          notionInfo={notionInfo}
          idVariation={idVariation}
          idVariationChange={idVariationChange}
          products={allProducts || []}
          selectedTitleObjects={quatityItems}
        />
      )}
    </>
  );
};

export default Step3;
