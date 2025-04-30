import { IChildrenProd, IProduct, IStockAndPrice } from "@/state/products/types"
import { IRelatedProductsATC } from "@/types"

export interface IProps {
  galleryImages?: string[]
  category: string
  title: string
  dreamDelivery?: boolean
  description?: string
  renders?: {[key: string]: string }
  children: IChildrenProd[] | undefined
  discount: number | undefined
  installments: number | undefined
  skus?: string
  stateLoading?: boolean
  defaultProds: string[] | undefined
  isCombo?: boolean
  tranferDiscount?: string
  idProd: string | undefined
  pillIdSpecialOffer?: string
  stockAndPrices?: IStockAndPrice | IStockAndPrice[]
  atcImage?:string
  feriaATCEnabled: boolean
  headPills?:string
  SecondheadPills?:string
  relatedItems?: IProduct[] | null;
  relatedProductsATC?: IRelatedProductsATC[] | null
  lcpImage?: string
  isDesktop?: boolean
  render?: boolean
  isComponentes?: boolean
  onSelectBundleChange?: (value: string | null) => void;
  isShelfPreconfigView?: boolean
  idCPValidator?: boolean
}

export interface IChildWithSize {
  sku: string;
  id: string;
  sizeNumber: number | null;
}

export interface ATCEvent {
  rpTesting?: boolean
  currency: string;
  value: number;
  items: {
    item_id: string;
    variant_id: string;
    item_name: string;
    item_list_id: string | null | undefined;
    item_category: string;
    item_list_name: string | null | undefined;
    item_variant: string;
    price: number;
    quantity: number;
  }[];
  relatedItems?: any[];
};

export interface IATCItem {
  id: number;
  quantity: number;
  sku: string;
}


