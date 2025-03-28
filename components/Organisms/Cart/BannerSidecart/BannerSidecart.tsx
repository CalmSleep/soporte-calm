import { useDispatch, useSelector } from "react-redux";
import { DivHeader } from "./styled";
import { getBannerSidecartData } from "@/state/hygraph/hygraphSelector";
import { useEffect, useState } from "react";
import { onGetBannerSidecartData } from "@/state/hygraph/hygraphActions";
import { skuBases, skuColchones, skuNewProducts } from "@/utils/skuColchonesOrBases"
import { getCartData } from "@/state/cart/cartSelector";

const BannerSidecart = ({show }: {show :boolean}) => {
    const dispatch = useDispatch()
    const bannerSidecart = useSelector(getBannerSidecartData)
    const cartData = useSelector(getCartData);
    const [showBanner, setshowBanner] = useState<string | undefined>()

    /* useEffect(() => {
        dispatch(onGetBannerSidecartData())
    }, []) */

    useEffect(() => {
        if (cartData?.items) {
            const hasBases = cartData?.items.some((product) => {
                const skus = skuBases();
                return skus.includes(product.sku)
              });
        
            const hasColchones = cartData?.items.some((product) => {
            const skus = skuColchones();
            return skus.includes(product.sku)
            });
        
          /*   const hasNewProducts = cartData?.items.some((product) => {
                const skus = skuNewProducts();
                return skus.includes(product.sku)
                }); */

            const hasOneProdcut = cartData?.items.length === 1 && cartData.items[0].quantity === 1;

            setshowBanner((hasOneProdcut && (hasBases || hasColchones)) 
            ? "10% OFF extra en tu Base comprando un Colchón"
           /*  : hasOneProdcut 
            ? "SUMÁ UN PRODUCTO MÁS PARA TENER UN 20% OFF" */
            : undefined
        )
        }
    }, [cartData])

    return (
        <>
            {/* bannerSidecart && */ showBanner && (
                <DivHeader /* color={bannerSidecart.colorText} $colorBg={bannerSidecart.colorBackground} */>
                    <p>{/* {bannerSidecart.textBanner} */}{showBanner}</p>
                </DivHeader>
            )}
        </>
    )

}

export default BannerSidecart