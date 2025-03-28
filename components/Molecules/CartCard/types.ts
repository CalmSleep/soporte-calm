export interface CartCardProps {
  keyItem: string;
  quantity: number;
  quantity_limit: number;
  name: string;
  totals: ITotals
  regular_price: string
  imageSrc: IImage | undefined
  variations?: {
      attributes: {
          [key: string]: string | number;
      }
      id: number
  }
  removeItem: (key: string, product?: string) => void;
  removeCoupon: (code: string) => void;
  isChange: boolean | undefined;
  isDelete: boolean | undefined;
  isCpCalc: boolean | undefined;
  isAddCoupon: boolean | undefined;
  fromCheckout?: boolean;
}

export interface IImage {
  src: string
  name: string
}

export interface ITotals {
  line_subtotal: string
  line_total: string
}