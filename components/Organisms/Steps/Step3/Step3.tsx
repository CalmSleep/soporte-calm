import StepsHeaders from "@/components/Molecules/StepBody/StepsHeader/StepsHeaders";
import React from "react";
import useValueSelect from "@/hooks/useValueSelect";
import Step3Select1 from "./Step3Select1/Step3Select1";
import { Step3Props } from "./types";
import Step3Select2 from "./Step3Select2/Step3Select2";
import Step4 from "../Step4/Step4";
import { useSelector } from "react-redux";
import { getThankuContent } from "@/state/order/orderSelector";
import optionStep3 from "./step3.json";
import {
  extractItemsInParens,
  filterTitlesByCategories,
  selectedTitleOthers,
  splitDevolucion,
  splitQuieroComprar,
} from "../util";
import itemsChanges from "./changesItems.json";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";
import { getAllProductsData } from "@/state/products/productsSelector";
const Step3 = ({
  valueSelect,
  setConfirmedValue,
}: // notionInfo,
// setNotionInfo,
Step3Props) => {
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
  } = useValueSelect();
  //  console.log("titles", selectedTitles);
  // console.log(notionInfo);
  const orders = useSelector(getThankuContent);
  const allProducts = useSelector(getAllProductsData);
  const matchedTitles = filterTitlesByCategories(itemsChanges, selectedTitles);

  const [quieroComprar, otros] = splitQuieroComprar(selectedTitles);
  const [continuemos, otros2] = splitDevolucion(selectedTitles);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const infoProduct =
    (valueSelect === "1" && selectedValue === "1") ||
    selectedValue === "4" ||
    selectedValue === "3"
      ? `${selectedTitleOthers(selectedTitles).join(", ")}`
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
      ? `${otros2.join(", ")}`
      : `${selectedTitles.filter((title) => !title.includes("-")).join(", ")}`;

  // console.log("valueSelect", valueSelect);

  // console.log("products", products);

  const result = selectedTitles
    .filter((title) => title.includes("-"))
    .map((title) => title.split(" - ")[0])
    .join(", ");

  const infoSelect2And3 = [
    products,
    valueSelect === "2" ? `${continuemos.join(", ")}` : result,
  ];

  React.useEffect(() => {
    setNotionInfo({
      ...notionInfo,
      problemDescription: valueSelect === "1" ? infoSelect1 : [],
      productReturn:
        valueSelect === "2"
          ? [`${otros2.join(", ")}`]
          : valueSelect === "3"
          ? [products]
          : [],
      productChange:
        valueSelect === "3"
          ? selectedTitles.filter((title) => title.includes("-"))
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
          if (valueSelect === "2" && selectedTitles.length > 0) {
            setModalIsOpen(true);
          } else {
            handleConfirmCheckbox();
          }
        }}
        value={
          valueSelect === "1"
            ? !selectedValue || !checkSeleccionado
            : valueSelect === "2"
            ? !checkSeleccionado
            : valueSelect === "3"
            ? !checkSeleccionado
            : false
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
          />
        ) : (
          <Step3Select2
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
            selectedTitles={selectedTitles}
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
          />
        )}
      </StepsHeaders>
      {checkboxConfirmed && (
        <Step4
          valueSelect={valueSelect || ""}
          selectedValue={selectedValue || ""}
          notionInfo={notionInfo}
          setNotionInfo={setNotionInfo}
        />
      )}
    </>
  );
};

export default Step3;
