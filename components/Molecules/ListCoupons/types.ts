import { ICoupon, IItem } from "@/state/cart/types"

export type ListCouponsProps = {
  couponsArray: {
    items?: IItem[]
    items_count?: number
    totals: {
      total_shipping?: string
      total_price?: string
      total_items?: string
      currency_code?: string
    }
    coupons?: ICoupon[]
  }
  disabled?: boolean
  checkoutOnlyToPay?: boolean
  deleteCuponIcon: string
}
