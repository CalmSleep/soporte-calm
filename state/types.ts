import { ICartState } from "./cart/types";
import { IHygraphState } from "./hygraph/types";
import { ILoadingState } from "./loading/types";
import { IMailchimp } from "./mailchimp/types";
import { IProductState } from "./products/types";
import { IOrderState } from "./order/types";
import { IModoResp } from "./modo/types";
import { IFormData } from "./formData/types";
import { ILoggedUser } from "./user/types";

export interface IStore {
  products: IProductState;
  cart: ICartState;
  loading: ILoadingState;
  mailchimp: IMailchimp;
  hygraph: IHygraphState;
  order: IOrderState;
  modo: IModoResp;
  formData: IFormData;
  user: ILoggedUser;
}

export interface IAPIResponse {
  dataCart: {
    status: number;
    data: {
      [key: string]: string | object;
    };
  };
}
