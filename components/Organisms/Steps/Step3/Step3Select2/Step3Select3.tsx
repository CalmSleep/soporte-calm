import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React from "react";
import { Step3Select2and3Props } from "../types";
import { menuData } from "@/components/Organisms/NavBar/utils";
import { useSelector } from "react-redux";
import { onGetAllProducts } from "@/state/products/productsActions";
import { IgetProducts } from "@/state/products/types";
import { getLoadingGetProducts } from "@/state/loading/loadingSelector";
import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader";

const Step3Select3 = ({
  handleCheckboxChange,
  selectedTitles,
  products,
}: {
  handleCheckboxChange: Step3Select2and3Props["handleCheckboxChange"];
  selectedTitles: string[];
  products: IgetProducts[];
}) => {
  const productsLoading = useSelector(getLoadingGetProducts);

  return (
    <>
      {productsLoading ? (
        <SkeletonLoader
          height="20px"
          width="100%"
          borderRadius="1000px"
          responsiveMobile={{ height: "20px" }}
        />
      ) : (
        <StepSelects
          selectedTitle={selectedTitles}
          titleParagraph="¿Por qué producto te gustaría hacer el cambio?"
          products={
            products &&
            products
              .filter((product) => product.name_category !== "muebles")
              .map((product) => {
                if (product.name_category === "accesorios") {
                  return {
                    ...product,
                    products: product.products.filter(
                      (p) =>
                        Number(p.id) !== 2677933 && Number(p.id) !== 2677939
                    ),
                  };
                }
                return product;
              })
          }
          //  products={products}
          onCheckboxChange={handleCheckboxChange}
          changedOption
          menuData={menuData}
        />
      )}
    </>
  );
};

export default Step3Select3;
