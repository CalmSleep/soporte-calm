export type DniInput = {
  dni: number;
};

export type ErrorInput = {
  [key: string]: string;
};

export interface IOrderResponse {
  id: number;
  order_key: string;
  status: string;
  number: string;
  currency_code: string;
  subtotal: number;
  total: string;
  total_discount: string;
  dni: string;
  cuit: string | null;
  payment_method: string;
  payment_details: IPaymentDetails;
  billing: ICustomerInfo;
  shipping: IShippingInfo;
  coupons: ICoupon[];
  items: IOrderItem[];
  sale_source: string;
}

export interface IPaymentDetails {
  alias: string;
  address: string;
  cuit: string;
  full_name: string;
  redirect_url: string;
}

export interface ICustomerInfo {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface IShippingInfo extends ICustomerInfo {
  notes: string;
  shipping_date: string;
  shipping_time: string;
  is_pickup: boolean;
  descansados: boolean;
  shipping_cost: number;
  pickup_location: string | null;
}

export interface ICoupon {
  code: string;
  totals: {
    total_discount: string;
  };
}

export interface IOrderItem {
  product_name: string;
  product_id: number;
  variation_id: number;
  attributes: Record<string, string> | null;
  short_description: string;
  quantity: number;
  subtotal: string;
  total: string;
  sku: string;
  img_url: string;
  regular_price: number | null;
}

export interface IOrdenMail {
  id: number;
  email: string;
  dni: string;
  name: string;
  phone: string;
  orderNumber: string;
  orderKey: string;
  orderStatus: string;
  saleSource: string;
  total: string;
  items: IItemOrden[];
  buttonRedirect: string;
}
export interface IItemOrden {
  name: string;
  price: string;
  quantity: number;
}
