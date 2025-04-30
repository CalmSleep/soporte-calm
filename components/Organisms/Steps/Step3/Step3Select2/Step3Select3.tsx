import StepSelects from "@/components/Molecules/StepBody/StepSelects/StepSelects";
import React from "react";
import itemsChanges from "../changesItems.json";
import { Step3Select2and3Props } from "../types";
import { menuData } from "@/components/Organisms/NavBar/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "@/state/products/productsSelector";
import { onGetAllProducts } from "@/state/products/productsActions";
import CardProducts from "@/components/Molecules/CardRelatedProductsATC/CardProducts";
import ProductProps from "@/components/Organisms/ProductProps/ProductProps";
import { IChildrenProd } from "@/state/products/types";
import productLandingRequests from "@/utils/productLandingRequests";
import { atrrToRender } from "@/utils/productsFunctios";

const Step3Select3 = ({
  handleCheckboxChange,
}: {
  handleCheckboxChange: Step3Select2and3Props["handleCheckboxChange"];
}) => {
  const [selectedChild, setSelectedChild] = React.useState<IChildrenProd>();
  const [isSizechange, setIsSizeChange] = React.useState(false);
  const [isColorchange, setIsColorChange] = React.useState(false);
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsData);

  React.useEffect(() => {
    const productsData = async () => {
      await dispatch(onGetAllProducts());
    };

    productsData();
  }, []);
  console.log(products?.map((product) => product.name_category));

  const productsData = products?.find(
    (product) => product.name_category === "almohadas"
  );
  const defaultProds = React.useMemo(() => [], []);

  return (
    <div>
      <StepSelects
        titleParagraph="¿Por qué producto te gustaría hacer el cambio?"
        products={products}
        onCheckboxChange={handleCheckboxChange}
        changedOption
        menuData={menuData}
      />
      {productsData?.products.map((product) => {
        const cardProductDate = menuData.flatMap((item) =>
          item.columns.flatMap((col) => col.products)
        );
        const descripcion = cardProductDate.find((item) =>
          item.name.toLowerCase().includes(product.name.toLowerCase())
        );
        let propsNames = atrrToRender(product.children);
        //  console.log(selectedChild);
        return (
          <>
            <CardProducts
              image={product.image_cross_selling}
              name={product.name}
              description={descripcion?.description || ""}
            />
            <ProductProps
              children={product.children}
              selectedChild={selectedChild}
              setSelectedChild={setSelectedChild}
              setIsColorChange={setIsColorChange}
              setIsSizeChange={setIsSizeChange}
              defaultProds={defaultProds}
              propsNames={propsNames}
            />
          </>
        );
      })}
    </div>
  );
};

export default Step3Select3;
