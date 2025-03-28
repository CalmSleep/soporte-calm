import { onRemoveItemFromCart, onRemoveCouponFromCart } from "@/state/cart/cartActions"
import { IStore } from "@/state/types"
import { useDispatch, useSelector } from "react-redux"
import { itemIsEDEAble } from "@/utils/itemIsEDEAble"
import { PEmptyCart, SectionCards } from "../styled"
import { getCartData, getVariationsData } from "@/state/cart/cartSelector"
import { getLoadingValues } from "@/state/loading/loadingSelector"
import { CartCard } from "@/components/Molecules/CartCard/CartCard"
import Text from "@/components/Atoms/Typography/Text"
import Images from "@/components/Atoms/Images/Images"
import { getEdeId } from "@/utils/EdeId"

const AddedProducts = () => {
    const dispatch = useDispatch()
    const cartData = useSelector((state: IStore) => getCartData(state))
    const loading = useSelector((state: IStore) => getLoadingValues(state))
    const variationsData = useSelector((state: IStore) =>
        getVariationsData(state)
    )

    const removeItemFromCart = async (key: string, product?: string) => {
        const edeItem = cartData?.items.find((item) => item.id == getEdeId())
        const edeAbledItems = cartData?.items.filter((item) =>
          itemIsEDEAble(item.sku)
        )
        if (
          edeItem &&
          edeAbledItems?.length == 1 &&
          edeAbledItems.some((i) => i.key == key)
        ) {
          await dispatch(onRemoveItemFromCart(edeItem.key, "Cart417"))
        }
        dispatch(onRemoveItemFromCart(key, "Cart419"))
    }

    if (cartData?.items && cartData.items.length > 0 && variationsData) {
      return (
        <SectionCards>
          {cartData.items.map((item) => {
            const attributes = variationsData?.find((it) => it.id == item.id)

            return (
                <CartCard
                  key={item.key}
                  keyItem={item.key}
                  quantity={item.quantity}
                  quantity_limit={item.quantity_limit}
                  name={item.name}
                  totals={item.totals}
                  regular_price={item?.prices?.regular_price as string}
                  imageSrc={item.images?.[0]}
                  removeItem={removeItemFromCart}
                  removeCoupon={(code: string) =>
                    dispatch(onRemoveCouponFromCart(code))
                  }
                  variations={attributes}
                  isChange={loading?.loadingUpdateToCart}
                  isDelete={loading?.loadingDeleteToCart}
                  isCpCalc={loading?.loadingEmptyCart}
                  isAddCoupon={loading?.loadingAddCoupon}
                />
            )
          })}
        </SectionCards>
      )
    } else {
      return (
        <PEmptyCart>
            <Text>Tu carrito está vacío</Text>
            <Images
              src="https://imagedelivery.net/7yveHullsFjmXtPLdJPFsg/fdded6b5-f37f-4eae-a0fa-522f87e77500/fit=cover"
              alt="Carrito img"
              width="20px"
              isLazy
            />
        </PEmptyCart>
      )
    }
}

export default AddedProducts