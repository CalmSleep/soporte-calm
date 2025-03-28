import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
  onAddCouponToCart,
  onAddItemToCart,
  onUpdateCartDataWithSession,
  onGetAllCartRelatedProducts,
  onGetAllVariations
} from "@/state/cart/cartActions"
import Modal from "./ModalSidecart/Modal"
import { IStore } from "@/state/types"
import { DivToast } from "./styled"
import BannerSidecart from "./BannerSidecart/BannerSidecart"
import RelatedProducts from "../RelatedProducts/RelatedProducts"
import {
  getAllCartCurrentProductsRelated,
  getCartData,
  getCartError,
} from "@/state/cart/cartSelector"
import { getLoadingValues } from "@/state/loading/loadingSelector"
import Spinner from "@/components/Atoms/Spinner/Spinner"
import { ToastContainer, toast } from "react-toastify"
import { CartProps } from "./types"
import Text from "@/components/Atoms/Typography/Text"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import 'react-toastify/dist/ReactToastify.css'
import { theme } from "@/utils/Theme";
import { onRedirectPaymentLoadingFinished } from "@/state/loading/loadingActions"
import Totals from "./Components/Totals"
import AddedProducts from "./Components/AddedProducts"
import Buttons from "./Components/Buttons"

const Cart = ({ isOpen, openCart, closeCart, puntoLocalm }: CartProps) => {
  const dispatch = useDispatch()
  const cartError = useSelector((state: IStore) => getCartError(state))
  const cartData = useSelector((state: IStore) => getCartData(state))
  const currentProductsRelated = useSelector((state: IStore) =>
    getAllCartCurrentProductsRelated(state, cartData?.items)
  )
  const loading = useSelector((state: IStore) => getLoadingValues(state))

  const [isCartLoaded, setIsCartLoaded] = useState(false)
  const [urlCouponAdded, setURLCouponAdded] = useState(false)
  const [ CouponSecUnid, setCouponSecUnid] = useState<boolean>(false)
  const [render, setRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRender(true)
    }, 2000)
  }, [render])

  const [initSidecart, setInitSidecart] = useState(false)

  const [urlCoupon, setURLCoupon] = useState<string | null>()
  const [ModalAlert, setModalAlert] = useState(false)
  const [couponAddedError, setCouponAddedError] = useState(false)
  const [urlAddToCart, setUrlAddToCart] = useState<{
    "add-to-cart": number
    quantity: string
  } | null>(null)

  useEffect(() => {
    if (cartError.error && cartError.addToCartErrorDetail) {
      toast.error(cartError.addToCartErrorDetail, {
        position: "top-right",
        autoClose: 5000,
        toastId: "stockError",
        icon: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        style: {
          backgroundColor: "#BA0000",
          color: "white",
          borderRadius: "0.5rem",
          fontFamily: `${theme.fonts.bold}`,
        }
      })
    }
  }, [cartError.addToCartErrorDetail]);

  useEffect(() => {
    const saveSessionCartData = async () => {
      const sessionCartData = localStorage.getItem("cartData")
      const cartDataDate = localStorage.getItem("cartDataDate")
      let validCartData = true
      if (cartDataDate != null && !isNaN(parseInt(cartDataDate))) {
        validCartData =
          (new Date().getTime() - new Date(parseInt(cartDataDate)).getTime()) /
            (1000 * 3600 * 24) <
          5
      }
      if (validCartData && sessionCartData) {
        dispatch(onUpdateCartDataWithSession(sessionCartData))
      }
      setInitSidecart(true)
    }
    saveSessionCartData()
  }, [])

  useEffect(() => {
    if (cartData) {
      localStorage.setItem("cartData", JSON.stringify(cartData))
      localStorage.setItem("cartDataDate", new Date().getTime().toString())
      let totalItems = 0;
      cartData.items.forEach(item => {
          totalItems += item.quantity;
        });
      setCouponSecUnid(!(totalItems > 1 || totalItems == 0))
      }
  }, [cartData])

  useEffect(() => {
    if (cartError && cartError.error) {
      localStorage.removeItem("cartData")
      localStorage.removeItem("cartDataDate")
    }
  }, [cartError])

  useEffect(() => {
    if (initSidecart && window) {
      //GET CART AL CARGAR LA PAGINA COMENTADO, PORQUE CON EL LOCAL STORAGE, AL HACER ALGUNA ACCION CON EL CARRITO, DEBERIA ACTUALIZARSE SIN NECESIDAD DEL GET CART
      /*
            if (!cartData) {
                dispatch(onGetCart())
            }
            */
      const queryParameters = new URLSearchParams(window.location.search)
      setURLCoupon(queryParameters.get("coupon"))
      const productId = queryParameters.get("add-to-cart")
      if (productId) {
        setUrlAddToCart({
          "add-to-cart": parseInt(productId),
          quantity: queryParameters.get("quantity") || "1"
        })
      }
    }
  }, [initSidecart])

  useEffect(() => {
    if (!isCartLoaded && cartData) {
      setIsCartLoaded(true)
    }
  }, [cartData])

  useEffect(() => {
    if (urlCoupon && isCartLoaded && !urlCouponAdded) {
      dispatch(onAddCouponToCart(urlCoupon))
      openCart()
      setURLCouponAdded(true)
    }
    const openWhenLoaded = async () => {
      if (urlAddToCart && isCartLoaded) {
        await dispatch(
          onAddItemToCart(
            urlAddToCart["add-to-cart"],
            parseInt(urlAddToCart["quantity"])
          )
        )
        openCart()
      }
    }

    openWhenLoaded()
  }, [isCartLoaded, urlAddToCart, urlCoupon])

  useEffect(() => {
    if (!loading.loadingAddCoupon) {
      setCouponAddedError(cartData?.coupons.length === 0)
    }
  }, [loading.loadingAddCoupon])

  useEffect(() => {
    if(render) {
      dispatch(onGetAllCartRelatedProducts())
      dispatch(onGetAllVariations())
    }
  }, [render])
/* 
  useEffect(() => {
    if (cartData?.items) {
      const { items } = cartData

      items.forEach((item) => {
        let child: IVariation | null = null

        if (variationsData) {
          const foundChild = variationsData.find((prod) => prod.id == item.id)

          if (foundChild) child = foundChild
        }
      })
    }
  }, [cartData, variationsData]) */

  useEffect(() => {
    const handler = () => {
      dispatch(onRedirectPaymentLoadingFinished())
    };

    window.addEventListener("pageshow", handler);
    window.addEventListener("pagehide", handler);
    return () => {
      window.removeEventListener("pageshow", handler);
      window.removeEventListener("pagehide", handler);
    };
  }, [])

 /*  if (!render) return null */

  return (
    <>
      {!puntoLocalm && (
        <>
           <ToastContainer />
          <Modal
            isOpen={isOpen}
            closeModal={closeCart}
            titleHeader={`Mi Carrito (${cartData?.items_count ?? 0})`}
          >
            {cartData && (
              <>
                <BannerSidecart show={CouponSecUnid}/>

                <AddedProducts/>

                <Totals/>

                <Buttons/>

                {cartData.items_count > 0 && (
                  <Margin margin="0 20px">
                    <Text color="offBlack" font="extraBold" align="center">
                      El descuento adicional por traferencia se aplica cuando elegis la forma de pago
                    </Text>
                  </Margin>
                )}
                {cartData.items_count > 0 && (
                  <RelatedProducts
                    relatedItems={currentProductsRelated}
                    title=""
                    boldTitle=""
                    isMobile
                    fromCart
                  />
                )}

                {ModalAlert && urlCoupon && (
                  <DivToast>
                    {loading.loadingAddCoupon ? (
                      <>
                        {toast.error(<Spinner />, {
                          position: "bottom-center",
                          autoClose: 2000,
                          toastId: "loader",
                          icon: false,
                          pauseOnFocusLoss: false,
                          style: {
                            textAlign: "center",
                            backgroundColor: "#8f4f9a",
                            color: "white",
                            borderRadius: "0.5rem",
                            width: "500px",
                            fontFamily: "Gilroy-Bold",
                            fontWeight: "700",
                            fontSize: "1.2rem",
                            letterSpacing: "1px",
                            lineHeight: "21px"
                          }
                        })}
                      </>
                    ) : couponAddedError ? (
                      <>
                        {toast.error("Hubo un error al cargar el cupon", {
                          position: "bottom-center",
                          autoClose: 5000,
                          toastId: "error",
                          icon: false,
                          pauseOnFocusLoss: false,
                          onClose: () => setModalAlert(false),
                          style: {
                            backgroundColor: "#8f4f9a",
                            color: "white",
                            borderRadius: "0.5rem",
                            width: "500px",
                            fontFamily: "Gilroy-Bold",
                            fontWeight: "700",
                            fontSize: "1.2rem",
                            letterSpacing: "1px",
                            lineHeight: "21px"
                          }
                        })}
                      </>
                    ) : (
                      <>
                        {toast.error("Se cargo el cupon correctamente", {
                          position: "bottom-center",
                          autoClose: 5000,
                          toastId: "succeeded",
                          icon: false,
                          pauseOnFocusLoss: false,
                          onClose: () => setModalAlert(false),
                          style: {
                            backgroundColor: "#8f4f9a",
                            color: "white",
                            borderRadius: "0.5rem",
                            width: "500px",
                            fontFamily: "Gilroy-Bold",
                            fontWeight: "700",
                            fontSize: "1.2rem",
                            letterSpacing: "1px",
                            lineHeight: "21px"
                          }
                        })}
                      </>
                    )}
                  </DivToast>
                )}
              </>
            )}
          </Modal>
          </>
        )}
        {puntoLocalm && (
          <>
            <AddedProducts/>

             <Totals/>

            <Buttons/>

            {ModalAlert && urlCoupon && (
              <DivToast>
                {loading.loadingAddCoupon ? (
                  <>
                    {toast.error(<Spinner />, {
                      position: "bottom-center",
                      autoClose: 2000,
                      toastId: "loader",
                      icon: false,
                      pauseOnFocusLoss: false,
                      style: {
                        textAlign: "center",
                        backgroundColor: "#8f4f9a",
                        color: "white",
                        borderRadius: "0.5rem",
                        width: "500px",
                        fontFamily: `${theme.fonts.bold}`,
                        fontWeight: "700",
                        fontSize: "1.2rem",
                        letterSpacing: "1px",
                        lineHeight: "21px"
                      }
                    })}
                  </>
                ) : couponAddedError ? (
                  <>
                    {toast.error("Hubo un error al cargar el cupon", {
                      position: "bottom-center",
                      autoClose: 5000,
                      toastId: "error",
                      icon: false,
                      pauseOnFocusLoss: false,
                      onClose: () => setModalAlert(false),
                      style: {
                        backgroundColor: "#8f4f9a",
                        color: "white",
                        borderRadius: "0.5rem",
                        width: "500px",
                        fontFamily: `${theme.fonts.bold}`,
                        fontWeight: "700",
                        fontSize: "1.2rem",
                        letterSpacing: "1px",
                        lineHeight: "21px"
                      }
                    })}
                  </>
                ) : (
                  <>
                    {toast.error("Se cargo el cupon correctamente", {
                      position: "bottom-center",
                      autoClose: 5000,
                      toastId: "succeeded",
                      icon: false,
                      pauseOnFocusLoss: false,
                      onClose: () => setModalAlert(false),
                      style: {
                        backgroundColor: "#8f4f9a",
                        color: "white",
                        borderRadius: "0.5rem",
                        width: "500px",
                        fontFamily: `${theme.fonts.bold}`,
                        fontWeight: "700",
                        fontSize: "1.2rem",
                        letterSpacing: "1px",
                        lineHeight: "21px"
                      }
                    })}
                  </>
                )}
              </DivToast>
            )}
          </>
        )}
    </> 
  )
}

export default Cart
