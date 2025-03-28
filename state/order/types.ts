export interface IOrderState {
  orderData?: IOrder;
  error?: boolean;
  transactionError?: any
  cardData?: ICardError | ICardInfo;
  orderCreated?: any;
  thankuContent?: any;
  cpFlota?: string[];
  cpCaba?: string[];
  errorToken?: boolean;
  dataToken?: any;
  tokenErrorMessage?: string
  deliveryTimes?: IDeliveryTime;
  orderExist?: IOrderExist;
  checkoutOnlyToPay?: boolean
  seguimiento?: ISeguimiento
  rdcData?: any
  forgottenEmail?: any
  ipClient?: string
  pathCheckout?: string
  noShippingCPs?: {[key: string]: ICP}
  paymentMethod?: string
  totalWithTranferDiscount?: number,
  date_test?: string
}

export interface ISeguimiento {
  order_id: number,
  steps_title: string,
  order_created_at?: string,
  order_confirmed_at?: string,
  order_packed_at?: string,
  provider?: string,
  provider_link?: string,
  provider_tracking_id?: string,
  order_delivered_at?: string,
  estimated_delivery_date?: string,
  step_number?: number,
  envio?: string
  products: CardCartThankuProps[]
  coupons?: ICoupon[]
  order_formatted_billing_address: string
  order_billing_phone?: string
  total: string
  subtotal: string
  metodo_de_pago: string
  descuento?: string
}

export interface ICoupon {
  code: string,
  totals: {
    total_discount: string
  },
}

export interface ICardError {
  error: string;
  payment_method_id?: number;
  issuerName?: string;
  plans: {
    installments: string;
    installments_to_send: string;
    coefficient: number;
    required_cat: string[];
    required_prod: string[];
  }[];
}

export interface ICardInfo {
  payment_method: string;
  payment_method_id: number;
  issuerName: string;
  plans: {
    installments: string;
    installments_to_send: string;
    coefficient: number;
    required_cat: string[];
    required_prod: string[];
  }[];
}

export interface IOrder {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: false;
  customer_id: 0;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string;
  date_paid_gmt: string;
  date_completed: null;
  date_completed_gmt: null;
  cart_hash: string;
  meta_data: IMetaData[];
  line_items: {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: {
      id: number;
      total: string;
      subtotal: string;
    }[];
    meta_data: IMetaData[];
    sku: string;
    price: number;
  }[];
  tax_lines: {
    id: number;
    rate_code: string;
    rate_id: number;
    label: string;
    compound: boolean;
    tax_total: string;
    shipping_tax_total: string;
    meta_data: IMetaData[];
  }[];
  shipping_lines: {
    id: number;
    method_title: string;
    method_id: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: IMetaData[];
  }[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
}

interface IMetaData {
  id: number;
  key: string;
  value: any;
}

interface IDeliveryTime {
  [key: number]: string[];
}

interface IOrderExist {
  order_exist?: boolean,
  order_paid?: boolean,
  order_data?: {
    [key: string]: any;
  }
}

export interface CardCartThankuProps {
  attributes:{ pa_tamano: string; pa_alto: string; tamano: string }
  img_url: string
  product_id: number
  product_name: string
  quantity: number
  regular_price: number
  short_description: string
  sku: string
  subtotal:string
  total: string
  variation_id: number
}

export interface ICP {
  dias: string
  proveedor: string
  provincia: string
  zona: string
}

export interface CartThanku {
  attributes: { pa_tamano: string; pa_alto: string; tamano: string }
  img_url: string
  product_id: number
  product_name: string
  quantity: number
  regular_price: number
  short_description: string
  sku:string
  subtotal: string
  total: string
  variation_id: number
}

export const TOKEN_ERROR_MESSAGE = "El tiempo de espera se ha excedido. Por favor recargá la página y reintentá la operación!";
export const POSSIBLE_TOKEN_ERROR = ["Invalid token", "Access denied: Unauthorized user"];