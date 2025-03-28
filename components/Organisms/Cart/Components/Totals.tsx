import { getCartData } from "@/state/cart/cartSelector"
import { IStore } from "@/state/types"
import { useDispatch, useSelector } from "react-redux"
import {
    PEmptyCart,
    SectionSubtotal,
    LoadingSubtotal,
    DivSubtotal,
    DivTotal,
    LoadingTotal,
    Content,
    Wrapper,
} from "../styled"
import Separator from "@/components/Atoms/Spacing/Separator/Separator"
import Text from "@/components/Atoms/Typography/Text"
import Images from "@/components/Atoms/Images/Images"
import AddCoupon from "../AddCoupon/AddCoupon"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import ShippingCalc from "../ShippingCalc/ShippingCalc"
import { onUpdateShippingFromCart } from "@/state/cart/cartActions"
import { formatNumber } from "@/utils/formatPrices"
import { getLoadingValues } from "@/state/loading/loadingSelector"
import { useEffect, useState } from "react"
import {
    getCartError,
    getSubtotalPrice,
    getTotalPrice,
    getShippingCost,
} from "@/state/cart/cartSelector"

const Totals = () => {
    const dispatch = useDispatch()
    const cartData = useSelector((state: IStore) => getCartData(state))
    const loading = useSelector((state: IStore) => getLoadingValues(state))
    const cartError = useSelector((state: IStore) => getCartError(state))
    const shippingCost = useSelector((state: IStore) => getShippingCost(state))
    const [errCoupon, setErrCoupon] = useState<string>("")
    const totalPrice = parseInt(
      useSelector((state: IStore) => getTotalPrice(state))
    )
    const subtotalPrice = parseInt(
      useSelector((state: IStore) => getSubtotalPrice(state))
    )

    useEffect(() => {
        if (cartError.error && cartError.errorDetail) {
            setErrCoupon(cartError.errorDetail)
            setTimeout(() => {
            setErrCoupon("")
            }, 3000)
        }
    }, [cartError.errorDetail])

    if (!cartData?.items || cartData.items.length === 0) {
      return null
    }

    return (
      <>
       <Separator margin="0" width="2px" color="superSilver" />
        <SectionSubtotal>
          <DivSubtotal>
            <Text font="bold">Subtotal</Text>
            <Wrapper>
              {loading.loadingUpdateToCart ? (
                <Content>
                  <LoadingSubtotal />
                </Content>
              ) : (
                <Text font="bold">
                  ${subtotalPrice ? formatNumber(subtotalPrice) : 0}
                </Text>
              )}
            </Wrapper>
          </DivSubtotal>
          <ShippingCalc
            totalShipping={shippingCost}
            updateShipping={(postcode: string) =>
              dispatch(onUpdateShippingFromCart(postcode))
            }
            isCpCalc={loading.loadingCalcShippingCost}
          />
        </SectionSubtotal>

        {cartData.items_count > 0 ? (
          <AddCoupon
            cartData={cartData}
            loading={loading}
            errCoupon={errCoupon}
            setErrCoupon={setErrCoupon}
          />
        ) : (
          <PEmptyCart>
            <Text>Tu carrito está vacío</Text>
            <Images
              src="https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/fdded6b5-f37f-4eae-a0fa-522f87e77500/fit=cover"
              alt="Carrito img"
              width="20px"
              isLazy
            />
          </PEmptyCart>
        )}

        <Separator width="2px" color="weldedIron" />
        <Margin margin="1rem">
          <DivTotal>
            <Text fontSize="1.3rem" font="medium">
              TOTAL
            </Text>
            <Wrapper>
              {loading.loadingUpdateToCart ? (
                <Content>
                  <LoadingTotal />
                </Content>
              ) : (
                <Text fontSize="1.3rem" font="medium">
                  ${totalPrice ? formatNumber(totalPrice) : 0}
                </Text>
              )}
            </Wrapper>
          </DivTotal>
        </Margin>
      </>
    )
}

export default Totals