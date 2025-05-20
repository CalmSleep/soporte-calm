import { IProps } from "./types";
import SelectorSize from "@/components/Molecules/SelectorAttributes/SelectorSize";
import SelectorHeight from "@/components/Molecules/SelectorAttributes/SelectorHeight";
import SelectorColor from "@/components/Molecules/SelectorAttributes/SelectorColor";
import { useEffect, useRef, useState } from "react";
import { IChildrenProd } from "@/state/products/types";
import { DivSizeText, DivSizeInfo, Container } from "./styled";
import SizeInfoWindow from "../SizeInfoWindow/SizeInfoWindow";
import Text from "@/components/Atoms/Typography/Text";
import url_variations from "@/utils/url_variations";
import SelectorCombo from "@/components/Molecules/SelectorAttributes/SelectorCombo";
import {
  allChildrenWithoutStock,
  childrenVariationWithoutStock,
  searchAttribute,
} from "@/utils/productsFunctios";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import {
  Arrow,
  DropdownContainer,
  DropdownHeader,
  DropdownList,
  DropdownListContainer,
  ListItem,
} from "../MainBlock/styled";
import { ArrowQuantity } from "../MainBlock/mainBlockicons";
import { HeightContainer } from "@/components/Molecules/SelectorAttributes/styled";
import SelectorQuantity from "@/components/Molecules/SelectorAttributes/SelectorQuantity";

const ProductProps = ({
  children,
  setSelectedChild,
  stockAndPrices,
  selectedChild,
  hasRenders,
  // isSizeChange,
  setIsSizeChange,
  category,
  defaultProds,
  setIsColorChange,
  isCategory,
  idProd,
  onQuantityChange,
  propsNames,
  selectedGroup,
  setSelectedGroup,
  setQuantityOpen,
  setIsQuantity,
}: IProps) => {
  const [tamanoState, setTamanoState] = useState("");
  const [altoState, setAltoState] = useState("");
  const [colorState, setColorState] = useState("");
  const [quantity, setQuantity] = useState(1);
  //logica de cantidad

  const [isSizeInfoOpen, setIsSizeInfoOpen] = useState(false);
  const [sizeByURL, setSizeByURL] = useState<string | null>();
  const [heightByURL, setHeightByURL] = useState<string | null>();
  const [colorByURL, setColorByURL] = useState<string | null>();
  const [variationsByURLSelected, setVariationsByURLSelected] = useState(false);
  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
  });
  const currentDay = new Date(now).getDay();
  const currentHour = new Date(now).getHours();
  const deliveryText = currentHour < 12 ? "HOY" : "MAÑANA";
  const [LamponneAvailability, setLamponneAvailability] = useState(false);

  const BED_CLOTHES = "ropa de cama";
  const BASES = "base";
  const DEFAULT = "default";

  const msjVariation = {
    [BED_CLOTHES]: "elegí la medida según el tamaño de tu colchón:",
    [DEFAULT]: "Seleccioná el tamaño",
    [BASES]: "se arma en menos de 15 minutos.",
  };

  let arrValuesAttr = searchAttribute(children);

  const isLamponneDay = (currentDay: number, currentHour: number) => {
    if (
      (currentDay == 6 && currentHour >= 8) ||
      (currentDay == 0 && currentHour < 12)
    ) {
      return false;
    }
    return true;
  };

  const groupChildrenByAttr = () => {
    const { alto, color } = propsNames;

    if (children) {
      const p = children?.filter((child) => {
        return (
          child.attributes[color] == colorState &&
          child.attributes[alto] == altoState
        );
      });

      setSelectedGroup(p);
    }
  };
  const findAndSetSelectedChild = (id: string) => {
    if (children) {
      const p = children.find((child) => child.id == id);
      console.log("p", p);

      if (p) {
        setSelectedChild(p);
        if (propsNames.tamano) setTamanoState(p.attributes[propsNames.tamano]);
        if (propsNames.alto) setAltoState(p.attributes[propsNames.alto]);
        if (propsNames.color) {
          /* apagamos selector de color en sommier */
          if (idProd == "1993786") {
            setColorState("gris-claro");
          } else {
            setColorState(p.attributes[propsNames.color]);
          }
        }
      }
    }
  };

  useEffect(() => {
    groupChildrenByAttr();
    const { tamano, color, alto } = propsNames;
    if (selectedChild) return;
    const p2 = children?.find((child) => {
      return (
        child.attributes[color] == colorState &&
        child.attributes[alto] == altoState &&
        child.attributes[tamano] == tamanoState
      );
    });
    if (p2) {
      setSelectedChild(p2);
    }
  }, [tamanoState, altoState, colorState, stockAndPrices, children]);

  useEffect(() => {
    const { tamano, alto, color } = propsNames;

    if (children && defaultProds && !sizeByURL && !heightByURL && !colorByURL) {
      const prodDef = children.find((child) =>
        defaultProds.includes(child.sku)
      );

      if (!prodDef || allChildrenWithoutStock(selectedGroup)) {
        if (childrenVariationWithoutStock(children[0])) {
          const childrenWithStock = children.filter(
            (c) => !childrenVariationWithoutStock(c)
          );
          const nextWithStock = childrenWithStock.reduce(
            //(max, c) => (c.price > max.price ? c : max),
            (min, c) => (c.price < min.price ? c : min),
            childrenWithStock[0]
          );
          setChild(nextWithStock ?? children[0], color, alto, tamano);
        } else {
          setChild(children[0], color, alto, tamano);
        }
      } else if (prodDef) {
        if (childrenVariationWithoutStock(prodDef)) {
          const childrenWithStock = children.filter(
            (c) => !childrenVariationWithoutStock(c)
          );
          const nextWithStock = childrenWithStock.reduce(
            //(max, c) => (c.price > max.price ? c : max),
            (min, c) => (c.price < min.price ? c : min),
            childrenWithStock[0]
          );
          setChild(nextWithStock ?? children[0], color, alto, tamano);
        } else {
          setChild(prodDef, color, alto, tamano);
        }
      }
    }
  }, [children, defaultProds, sizeByURL, heightByURL, colorByURL]);

  useEffect(() => {
    if (selectedChild && stockAndPrices && !Array.isArray(stockAndPrices)) {
      const childSelect = stockAndPrices.children?.find(
        (child) => child.id == selectedChild?.id
      );
      if (childSelect) {
        if (
          childSelect.preparation_time == 0 &&
          isLamponneDay(currentDay, currentHour)
        ) {
          setLamponneAvailability(true);
        } else {
          setLamponneAvailability(false);
        }
      }
    }
  }, [selectedChild]);

  const setChild = (
    child: IChildrenProd,
    color: string,
    alto: string,
    tamano: string
  ) => {
    setSelectedChild(child);
    /* apagamos selector de color en sommier */
    if (idProd == "1993786") {
      setColorState("gris-claro");
    } else {
      setColorState(child ? child.attributes[color] : "");
    }
    setAltoState(child ? child.attributes[alto] : "");
    setTamanoState(child ? child.attributes[tamano] : "");
  };

  return (
    <>
      {category !== "muebles" && (
        <DivSizeText>
          <Text
            font={isCategory ? "bold" : "medium"}
            fontSize={isCategory ? "1rem" : ".9rem"}
            color="lead"
            responsiveMobile={{
              width: "auto",
            }}
          >
            {msjVariation[category === BED_CLOTHES ? BED_CLOTHES : DEFAULT]}
          </Text>

          <DivSizeInfo $isActive={isSizeInfoOpen}>
            <SizeInfoWindow setIsSizeInfoOpen={setIsSizeInfoOpen} />
          </DivSizeInfo>
        </DivSizeText>
      )}

      {arrValuesAttr.tamano.length > 1 && (
        <SelectorSize
          arrChildren={selectedGroup?.sort((c1, c2) => c1.price - c2.price)}
          selected={selectedChild}
          setSelected={findAndSetSelectedChild}
          valToSearch={propsNames.tamano}
          hasRenders={hasRenders}
          //   isSizeChange={isSizeChange ?? false}
          setIsSizeChange={setIsSizeChange}
          landing={category}
          isCategory={isCategory}
        />
      )}

      {arrValuesAttr.alto.length !== 0 && idProd !== "1953560" && (
        <SelectorHeight
          arrChildren={children}
          arrOptions={arrValuesAttr.alto}
          selectedChild={selectedChild}
          selectedProp={altoState}
          hasRenders={hasRenders}
          setSelectedProp={setAltoState}
          setIsSizeChange={setIsSizeChange}
          valToSearch={propsNames.alto}
          sizeName={propsNames.tamano}
          isCategory={isCategory}
        />
      )}

      {/* apagamos selector de color en sommier */}
      {arrValuesAttr.color.length !== 0 && idProd != "1993786" && (
        <SelectorColor
          arrChildren={children}
          arrOptions={arrValuesAttr.color}
          selectedChild={selectedChild}
          selectedProp={colorState}
          setSelectedProp={setColorState}
          valToSearch={propsNames.color}
          sizeName={propsNames.tamano}
          setIsColorChange={setIsColorChange}
        />
      )}

      <SelectorQuantity
        quantity={quantity}
        setQuantity={setQuantity}
        setQuantityOpen={setQuantityOpen}
        setIsQuantity={setIsQuantity}
      />
    </>
  );
};

export default ProductProps;
