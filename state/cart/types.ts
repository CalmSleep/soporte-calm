import { IProduct } from '../products/types'

export interface ICartState {
  error: boolean
  errorDetail?: string
  addToCartErrorDetail?: string
  variationsData?: {
    attributes: {
      [key: string]: string | number
    }
    id: number
    atcImage?:string
  }[]
  cartData?: {
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
    shipping_rates: {
      shipping_rates: {
        price: string | number
      }[]
    }[]
    shipping_address: {
      postcode: string
    }
  }
  currentProductsRelated?: IProduct[]
  allProductsRelatedByID?: {[id: string]: IProduct[] | null}
  openSideCart?: boolean
  showFixedCart?: boolean
  isATCVisible?: boolean
  isMobileMenuOpen?: boolean
  isChatOpen?: boolean
  abandonoPopup?: boolean
}

export interface ICoupon {
  code: string
  totals: {
    total_discount: string
  }
}

export interface IVariation {
  attributes: {
    [key: string]: string | number
  }
  id: number
}

export interface IItem {
  key: string
  id: number
  quantity: number
  quantity_limit: number
  items_count: number
  name: string
  sku: string
  totals: ITotals
  images: IImage[]
  description?: string
  prices?: IPrice
  permalink: string
}

export interface IPrice {
  regular_price: string
  currency_code: string
  sale_price: string
}

export interface IImage {
  src: string
  name: string
}

export interface ITotals {
  line_subtotal: string
  line_total: string
}
