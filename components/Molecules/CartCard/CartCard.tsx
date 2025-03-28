import CounterQty from "./CounterQty/CounterQty"
import {
  ButtonWrapper,
  CardCart,
  Content,
  DivImg,
  DivProductText,
  DivProductTitle,
  LoadingTotal,
  PricesContainerSection,
  ProductCounter,
  Wrapper
} from "./styled"
import { CartCardProps } from "./types"
import { formatNumber } from "@/utils/formatPrices"
import { useDispatch } from "react-redux"
import { onUpdateItemFromCart } from "@/state/cart/cartActions"
import variations_products from "@/utils/variations_products"
import type {} from "redux-thunk/extend-redux"
import { useSelector } from "react-redux"
import { IStore } from "@/state/types"
import { getLoadingPay } from "@/state/loading/loadingSelector"
import Images from "@/components/Atoms/Images/Images"
import Titles from "@/components/Atoms/Typography/Titles"
import Text from "@/components/Atoms/Typography/Text"
import Button from "@/components/Atoms/Buttons/Button"

export const CartCard = ({
  keyItem,
  quantity,
  quantity_limit,
  name,
  totals,
  regular_price,
  imageSrc,
  removeItem,
  variations,
  isChange,
  isDelete,
  isCpCalc,
  isAddCoupon,
  fromCheckout
}: CartCardProps) => {
  const imgGeneric =
    "https://di-sitebuilder-assets.s3.amazonaws.com/generic-placeholder.png"

  const loadingPay = useSelector((state: IStore) => getLoadingPay(state))

  const regularPrice = parseInt(regular_price)
  const subtotalPrice = parseInt(totals.line_subtotal)
  const totalRegPrice = regularPrice * quantity
  const dispatch = useDispatch()

  const updateItem = (quantity: number) => {
    dispatch(onUpdateItemFromCart(keyItem, quantity, name))
  }

  return (
    <CardCart $fromCheckout={fromCheckout}>
      <DivImg>
        <Images
          src={imageSrc ? imageSrc.src : imgGeneric}
          alt={imageSrc ? imageSrc.name : "Producto sin imagen"}
          width="auto"
          height="5rem"
          responsiveMobile={{
            width: "auto",
            height: "5rem"
          }}
          isLazy
        />
      </DivImg>

      <DivProductTitle>
        <Titles
          titleTag="h3"
          color="yellowCalm"
          fontSize="0.9rem"
          font="extraBold"
          lineHeight="1"
        >
          {name}
        </Titles>
      </DivProductTitle>

      {
        <DivProductText>
          {variations &&
            variations.attributes &&
            Object.keys(variations.attributes).map((at, index) => {
              const attribute = at
                ? variations.attributes[
                    at as keyof typeof variations.attributes
                  ]
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
                  font="bold"
                  color="millionGray"
                  fontSize="0.8rem"
                  key={at}
                >
                  {`${text.trim()}${
                    Object.keys(variations.attributes).length - 1 == index
                      ? ""
                      : ", "
                  }`}
                </Text>
              )
            })}
        </DivProductText>
      }

      <ProductCounter>
        <CounterQty
          qtyMax={quantity_limit}
          quantity={quantity}
          updateItem={updateItem}
          backorder
          isChange={isChange}
          isDelete={isDelete}
          isCpCalc={isCpCalc}
          isAddCoupon={isAddCoupon}
          fromCheckout={fromCheckout}
        />
      </ProductCounter>

      <PricesContainerSection>
        <Wrapper>
          {isChange || isDelete || isCpCalc ? (
            <Content>
              <>
                <LoadingTotal />
              </>
            </Content>
          ) : (
            <>
              {totalRegPrice === subtotalPrice ? (
                <>
                  <Text font="bold" fontSize="1rem">
                    ${formatNumber(totalRegPrice)}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    textDecoration="line-through"
                    font="medium"
                    color="weldedIron"
                  >
                    ${formatNumber(totalRegPrice)}
                  </Text>
                  <Text color="parkPicnic" font="bold" fontSize="1rem">
                    ${formatNumber(subtotalPrice)}
                  </Text>
                </>
              )}
            </>
          )}
        </Wrapper>
      </PricesContainerSection>

      {!fromCheckout && (
        <ButtonWrapper>
          <Button
            onClick={() => removeItem(keyItem, name)}
            disabled={loadingPay || isChange || isDelete || isCpCalc}
            size="none"
          >
            <Images
              alt="Icono de eliminar producto"
              src="https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/377bc4d8-bcc7-494f-926b-e814a73da300/fit=cover"
              isLazy
            />
          </Button>
        </ButtonWrapper>
      )}
    </CardCart>
  )
}
