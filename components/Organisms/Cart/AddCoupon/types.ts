import { ICoupon, IItem } from "@/state/cart/types"
import { ILoadingState } from "@/state/loading/types"
import { Dispatch, SetStateAction } from "react"

export type AddCouponProps = {
  cartData: CartDataProps
  loading: ILoadingState
  errCoupon: string
  setErrCoupon: Dispatch<SetStateAction<string>>
}

export type CartDataProps = {
  items: IItem[]
  items_count: number
  coupons: ICoupon[]
  totals: {
    total_discount: string
    total_shipping: string
    total_price: string
    total_items: string
    currency_code: string
  }
  shipping_address: {
    postcode: string
  }
}
