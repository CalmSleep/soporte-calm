export interface IProductState {
  error: boolean;
  productsData?: IProduct[];
  allProductsData?: IgetProducts[];
  currentProductsRelated?: IProduct[];
  newProductsRelated?: IProduct[];
  defaultProducts?: string[];
  shippingTime?: IShippingTime;
  holidays?: IHoliday[];
  stock?: IStock;
  stockAndPricesData?: IStockAndPrice;
  unavailableDays?: string[];
  nuevosDisenos?: boolean;
  isQuizzOpen?: boolean;
  overlay?: boolean;
  isNavbarVisible?: boolean;
  relampagoProduct?: IProduct[];
}

export interface IStockAndPrice {
  id: string;
  children: {
    preparation_time: number;
    id: string;
    price: number;
    regular_price: number;
    stock: number;
    backorder: boolean;
  }[];
}

export interface IProduct {
  id: string;
  id_prod: string;
  id_parent: string;
  short_description: string;
  sku: string;
  name: string;
  name_parent: string;
  category: string;
  type: string;
  image_url: string;
  image: string;
  attributes: IAttributes;
  price: number;
  regular_price: number;
  children: IChildrenProd[];
  gallery_image_url: string[];
  discount: number | string;
  discount_pill: string;
  installments: number;
  offer: string;
  stock?: number;
  backorder?: boolean;
  image_cross_selling?: string;
}

export interface IChildrenProd {
  out_of_stock?: any;
  id: string;
  backorder: boolean;
  sku: string;
  name: string;
  price: number;
  stock: number;
  regular_price: number;
  attributes: IAttributes;
  sizeNumber?: number;
  quantity?: number;
}

export interface IAttributes {
  [attribute: string]: string;
}

export interface IAttributesLocalm {
  [key: string]: string[];
}
export interface IShippingTime {
  data: {
    max_date: string;
    min_date: string;
    real_date: string;
    diffDays: string;
  };
  status: number;
}

export interface IHoliday {
  holiday_date: string;
  description: string;
}

export interface IStock {
  [key: string]: {
    [key: string]:
      | { physical_qty: number; available_qty: number }
      | { available_qty: number };
  };
}

export interface IgetProducts {
  discount: number;
  installments: number;
  name_category: string;
  products: IProduct[];
}
