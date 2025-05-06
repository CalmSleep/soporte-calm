import variations_products from "@/utils/variations_products"
import { ColorContainer, SelectColor } from "./styled"
import { IProps, SearchResult } from "./types"
import { useEffect, useState } from "react"
import colors_selector from "@/utils/colors_selector"
import Titles from "@/components/Atoms/Typography/Titles"
import Text from "@/components/Atoms/Typography/Text"
import ButtonAttributes from "@/components/Atoms/Buttons/ButtonAttributes"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"

const SelectorColor = ({
  arrChildren,
  arrOptions,
  selectedChild,
  selectedProp,
  setSelectedProp,
  valToSearch,
  setIsColorChange,
  sizeName,
  isRP
}: IProps) => {
  const [childrenByColor, setChildrenByColor] = useState({})

  useEffect(() => {
    if (arrChildren && selectedChild) {
      const p: SearchResult = {};
      arrChildren.forEach((child) => {
        if (child.attributes[sizeName] === selectedChild.attributes[sizeName]) {
          p[child.attributes[valToSearch as keyof typeof child.attributes]] = {
            stock: child.stock,
            backorder: child.backorder
          };
        }
      });
      setChildrenByColor(p);
    }
  }, [arrChildren, selectedChild, sizeName, valToSearch]);
  
  return (
    <ColorContainer>
      <Text fontSize=".9em" font="medium">
        Color: {" "} {variations_products[selectedProp as keyof typeof variations_products]}
      </Text>
      <SelectColor>
        {Object.keys(childrenByColor).length > 0 &&
          arrOptions?.map((color: string) => (
            <ButtonAttributes
              key={color}
              select={
                selectedProp === color &&
                (childrenByColor[color as keyof typeof childrenByColor][
                  "stock"
                ] > 0
                  ? true
                  : childrenByColor[color as keyof typeof childrenByColor][
                    "backorder"
                  ] ? true
                  : false)
              }
              disabled={
                childrenByColor[color as keyof typeof childrenByColor][
                  "stock"
                ] <= 0 &&
                !childrenByColor[color as keyof typeof childrenByColor][
                  "backorder"
                ]
              }
              style={{
                backgroundColor:
                  colors_selector[color as keyof typeof colors_selector]
              }}
              onClick={() => {
                setSelectedProp && setSelectedProp(color)
                setIsColorChange && setIsColorChange(true)
              }}
              title={
                variations_products[
                  selectedProp as keyof typeof variations_products
                ]
              }
              ariaLabel={
                variations_products[
                  selectedProp as keyof typeof variations_products
                ]
              }
              isRP={isRP}
            />
          ))}
      </SelectColor>
    </ColorContainer>
  )
}

export default SelectorColor
