import { HeightContainer, SelectHeight, WrapperPrices, ContainerPack, PillOfert} from "./styled"
import { IProps, SearchResult } from "./types"
import { SetStateAction, useEffect, useState } from "react"
import { formatNumber } from "@/utils/formatPrices"
import Button from "@/components/Atoms/Buttons/Button"
import Text from "@/components/Atoms/Typography/Text"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import Images from "@/components/Atoms/Images/Images"

const SelectorCombo = ({
  price,
  onQuantityChange,
  idProd
}: IProps) => {
  const [quantity, setQuantity] = useState(1); 

  const priceCombo = price ? (price * 2) * 0.90 : 0;

  const handleSelectQuantity = (selectedQuantity: SetStateAction<number>) => {
    setQuantity(selectedQuantity);
  };
 
  useEffect(() => {
    if(onQuantityChange){
      onQuantityChange(quantity);
  }
  }, [quantity, onQuantityChange]);

  return (
    <HeightContainer>
      <Margin margin="5px 0" marginMobile="2px" />
      <ContainerPack>
        <Text fontSize=".9em" font="medium">
          Seleccioná por cantidad
        </Text>
      </ContainerPack>
      <Margin margin="5px 0" marginMobile="4px" />

      <SelectHeight $isCombo={true}>
        <Button
          disabled={false}
          className={quantity === 1 ? 'selected' : ''}
          onClick={() => handleSelectQuantity(1)}
        >
          <Text
            color="offBlack"
            font="bold"
            fontSize="1rem"
            align="left"
            responsiveMobile={{
              width: "auto",
              fontSize: "0.85rem"
            }}
          >
            1 Unidad
          </Text>
          {(idProd == '2249180' || idProd == "2249006") && (
            <Text
              color="millionGray"
              font="medium"
              align="left"
              responsiveMobile={{
                width: "auto",
                fontSize: "0.85rem"
              }}
            >
              $ {formatNumber(price ?? 0)}
            </Text>
          )}
        </Button>
        <Button
          disabled={false}
          className={quantity === 2 ? 'selected' : ''}
          onClick={() => handleSelectQuantity(2)}
        >
          <Text
            color="offBlack"
            font="bold"
            fontSize="1rem"
            align="left"
            responsiveMobile={{
              width: "auto",
              fontSize: "0.85rem"
            }}
          >
            2 Unidades
          </Text>
          {(idProd == '2249180' || idProd == "2249006") && (
            <>
          <WrapperPrices>
            <Text
              color="millionGray"
              font="medium"
              align="left"
              responsiveMobile={{
                width: "auto",
                fontSize: "0.85rem"
              }}
            >
              ${formatNumber(priceCombo)}
            </Text>
            <Text
              font="regular"
              fontSize="1rem"
              color="millionGray"
              textDecoration="line-through"
              textTag="span"
              responsiveMobile={{
                fontSize: "0.85rem"
              }}
            >
              ${formatNumber(price ? price * 2 : 0)}
            </Text>
          </WrapperPrices>
          
          <PillOfert>
            <Text
            font="regular"
            color="white"
            fontSize=".8rem"
            >
              10% OFF 
            </Text>
              
          </PillOfert>
          </>
          )}
        </Button>
      </SelectHeight>
    </HeightContainer>
  );
};

export default SelectorCombo;