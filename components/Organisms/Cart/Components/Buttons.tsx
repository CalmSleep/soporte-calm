import { IStore } from "@/state/types"
import { useDispatch, useSelector } from "react-redux"
import { getCartData } from "@/state/cart/cartSelector"
import Text from "@/components/Atoms/Typography/Text"
import { onRedirectPaymentLoadingStart } from "@/state/loading/loadingActions"
import { useEffect } from "react"
import { getCheckoutPath } from "@/state/order/orderSelector"
import { useRouter } from "next/router"
import { productURLRedirectionByEnv } from "@/utils/productURLRedirectionByEnv"
import { onDefineCheckoutPath } from "@/state/order/orderActions"
import { getLoadingPaymentRedirect, getLoadingValues } from "@/state/loading/loadingSelector"
import Button from "@/components/Atoms/Buttons/Button"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import Spinner from "@/components/Atoms/Spinner/Spinner"

export const Buttons = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const cartData = useSelector((state: IStore) => getCartData(state))
    const loading = useSelector((state: IStore) => getLoadingValues(state))
    const pathToCheckout = useSelector((state: IStore) => getCheckoutPath(state))
    const paymentLoading = useSelector((state: IStore) => getLoadingPaymentRedirect(state))

    const loadingPagoLanding = () => {
      dispatch(onRedirectPaymentLoadingStart())
      if (pathToCheckout) {
        redirectToCheckout(pathToCheckout)
      } else {
        dispatch(onDefineCheckoutPath())
      }
    }

    const redirectToCheckout = (path: string) => {
       /*  sendClarityCustomEvent("checkout", `${path}`); */
        router.push(productURLRedirectionByEnv(`/${path}`))
    }

    useEffect(() => {
        if(pathToCheckout) {
        redirectToCheckout(pathToCheckout)
        }
    }, [pathToCheckout])

    if (!cartData?.items || cartData.items.length === 0) {
      return null
    }

    return (
      <>
        {loading.loadingDeleteToCart ||
        loading.loadingUpdateToCart ||
        loading.loadingEmptyCart ||
        loading.loadingStartBuy ||
        loading.loadingAddCoupon ||
        loading.loadingAddToCart ||
        paymentLoading ||
        loading.loadingDeleteCoupon ? (
          <Margin margin="1rem 1rem">
            <Button
              borderRadius="6px"
              width="100%"
              backgroundColor="parkPicnic"
              backgroundColorHover="hawaiianTiLead"
              aria-label="Iniciar compra"
            >
              <Spinner />
            </Button>
          </Margin>
        ) : (
          <Margin margin="1rem 1rem">
            <Button
              borderRadius="6px"
              width="100%"
              backgroundColor="parkPicnic"
              backgroundColorHover="hawaiianTiLead"
              onClick={loadingPagoLanding}
            >
              <Text
                fontSize="1rem"
                font="bold"
                color="white"
                letterSpacing="1.2px"
              >
                Iniciar compra
              </Text>
            </Button>
          </Margin>
        )}
      </>
    )
}

export default Buttons;