import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React from "react";
import { Step3Select2and3Props } from "../types";
import { menuData } from "@/components/Organisms/NavBar/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "@/state/products/productsSelector";
import { onGetAllProducts } from "@/state/products/productsActions";

const Step3Select3 = ({
  handleCheckboxChange,
  selectedTitles,
}: {
  handleCheckboxChange: Step3Select2and3Props["handleCheckboxChange"];
  selectedTitles: string[];
}) => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsData);

  React.useEffect(() => {
    const productsData = async () => {
      await dispatch(onGetAllProducts());
    };

    productsData();
  }, []);

  return (
    <StepSelects
      selectedTitle={selectedTitles}
      titleParagraph="¿Por qué producto te gustaría hacer el cambio?"
      products={products}
      onCheckboxChange={handleCheckboxChange}
      changedOption
      menuData={menuData}
    />
  );
};

export default Step3Select3;
