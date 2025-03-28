import { useDispatch, useSelector } from "react-redux"
import variations_products from "@/utils/variations_products"
import { formatNumber } from "@/utils/formatPrices"
import {
  DivUnit,
  Article,
  AddToCart,
  TitleBoldDiv,
  VariationsDiv
} from "./styled"
import { onAddItemToCart, onUpdateItemFromCart } from "@/state/cart/cartActions"
import { RelatedCardProps } from "./types"
import {
  getLoadingAddToCart,
  getLoadingAddOrUpdateCart,
  getLoadingPay
} from "@/state/loading/loadingSelector"
import Spinner from "@/components/Atoms/Spinner/Spinner"
import { getCartData } from "@/state/cart/cartSelector"
import { useState } from "react"
import Text from "@/components/Atoms/Typography/Text"
import Pills from "../../Atoms/Pills/Pills"
import Images from "@/components/Atoms/Images/Images"
import Titles from "@/components/Atoms/Typography/Titles"
import Button from "@/components/Atoms/Buttons/Button"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import { onCloseSideCart } from "@/state/cart/cartActions";

const RelatedCard = ({
  img,
  name,
  regular_price,
  price,
  link,
  variations,
  fromCart,
  id_item,
  category
}: RelatedCardProps) => {
  const loadingAddToCart = useSelector(getLoadingAddToCart)
  const loadingPay = useSelector(getLoadingPay)
  const loadingAddOrUpdateCart = useSelector(getLoadingAddOrUpdateCart)
  const cartData = useSelector(getCartData)
  const dispatch = useDispatch()

  const [productAdded, setProductAdded] = useState<string | undefined>("")

  const addToCart = async () => {
    if (id_item && !loadingAddToCart) {
      setProductAdded(id_item)
      const itemInCart = cartData?.items.find(
        (item) => item.id.toString() == id_item
      )
      if (itemInCart) {
        const key = itemInCart.key
        const qty = itemInCart.quantity + 1
        await dispatch(onUpdateItemFromCart(key, qty))
        setProductAdded("")
      } else {
        await dispatch(onAddItemToCart(parseInt(id_item), 1))
        setProductAdded("")
      }
    }
  }

  const handleRedirect = () => {
    dispatch(onCloseSideCart());
  };

  const returnConditionalRegularPrice = () => {
    return regular_price == 0 || regular_price == price ? (
      <>
        <Text color="offBlack">
          desde: {" "}
          <Text textTag="span" font="extraBold" fontSize="1.1rem">
            ${formatNumber(price)}
          </Text>
        </Text>
      </>
    ) : (
      <>
        <Text color="millionGray">
          Desde{" "}
          <Text 
            textTag="span" 
            font="bold" 
            color="offBlack"
            fontSize="1.1rem"
          >
            ${formatNumber(price)}{" "}
          </Text>
          <Text
            textTag="span"
            textDecoration="line-through"
            color="millionGray"
          >
            ${formatNumber(regular_price)}
          </Text>
        </Text>
          
      </>
    )
  }

  return (
    <Article>
      <DivUnit>
        {category && (
         <Pills isRelatedProducts isOfferProduct categoryPill={category} fromCart/>
        )}

        <Text link={link} textTag="a" isNextLink handleClick={handleRedirect}>
           <Images
            data-src={img.replace("/thumbnail", "/fit=cover")}
            src={img.replace("/thumbnail", "/fit=cover,width=400,height=300")}
            alt={"producto relacionado " + name}
            borderRadius={fromCart ? "0" : "10px"}
            width={
              !fromCart
                ? "16rem"
                : fromCart
                && "auto"
            }
            height={
              fromCart
                ? "8rem"
                :  !fromCart
                && "12rem"
            }
            isLazy
            responsiveMobile={{
              width: fromCart ? "auto" : "14rem",
              height: fromCart ? "8rem" : "9rem",
              borderRadius: fromCart ? "0" : "10px"
            }}
            objectFit="cover"
          />
        </Text>

        <Margin margin="5px 0">
          <TitleBoldDiv>
            <Titles
              titleTag="h4"
              font="bold"
              fontSize={"1rem"}
              color={fromCart ? "millionGray" : "offBlack"}
            >
              {name}
            </Titles>
          </TitleBoldDiv>
        </Margin>
        <VariationsDiv>
          {variations_products &&
            Object.keys(variations).map((at, index) => {
              const attribute = at
                ? variations[at as keyof typeof variations]
                : ""
              const variation = attribute
                ? variations_products[
                    attribute as keyof typeof variations_products
                  ]
                : undefined
              const text = attribute && variation ? variation : ""

              return (
                <Text
                  textTag="span"
                  color="millionGray"
                  fontSize="0.8rem"
                  key={at}
                >
                  {`${text.trim()}${
                    Object.keys(variations).length - 1 == index ? "" : ", "
                  }`}
                </Text>
              )
            })}
        </VariationsDiv>

        {fromCart ? (
          <Text
            textTag="span"
            font="extraBold"
            fontSize={fromCart ? "0.9rem" : "1.1em"}
            color={fromCart ? "dullViolet" : "offBlack"}
          >
            ${formatNumber(price)}
          </Text>
        ) : (
          returnConditionalRegularPrice()
        )}

        {fromCart && id_item && (
          <AddToCart $notEnabled={loadingPay}>
            <Button onClick={addToCart} disabled={loadingPay} size="none">
              {(loadingAddToCart || loadingAddOrUpdateCart) &&
              productAdded === id_item ? (
                <Spinner />
              ) : (
                <>
                  +
                </>
              )}
            </Button>
          </AddToCart>
        )}
      </DivUnit>
    </Article>
  )
}

export default RelatedCard
