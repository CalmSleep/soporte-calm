import { AnyAction } from "@reduxjs/toolkit";
import {
  ON_GET_CART_LOADING_START,
  ON_GET_CART_LOADING_FINISHED,
  ON_ADD_TO_CART_LOADING_START,
  ON_ADD_TO_CART_LOADING_FINISHED,
  ON_UPDATE_TO_CART_LOADING_START,
  ON_UPDATE_TO_CART_LOADING_FINISHED,
  ON_DELETE_TO_CART_LOADING_START,
  ON_DELETE_TO_CART_LOADING_FINISHED,
  ON_ADD_COUPON_LOADING_START,
  ON_ADD_COUPON_LOADING_FINISHED,
  ON_DELETE_COUPON_LOADING_START,
  ON_DELETE_COUPON_LOADING_FINISHED,
  ON_CALC_SHIPPING_COST_LOADING_START,
  ON_CALC_SHIPPING_COST_LOADING_FINISHED,
  ON_EMPTY_CART_LOADING_START,
  ON_EMPTY_CART_LOADING_FINISHED,
  ON_START_BUY_LOADING_START,
  ON_START_BUY_LOADING_FINISHED,
  ON_GET_ORDER_LOADING_START,
  ON_GET_ORDER_LOADING_FINISHED,
  ON_SUBSCRIBE_STOCKOUT_LOADING_START,
  ON_SUBSCRIBE_STOCKOUT_LOADING_FINISHED,
  ON_NEWSLETTER_LOADING_START,
  ON_NEWSLETTER_LOADING_FINISHED,
  ON_GET_CARD_INFO_LOADING_START,
  ON_GET_CARD_INFO_LOADING_FINISHED,
  ON_CHECKOUT_NEWS_LOADING_START,
  ON_CHECKOUT_NEWS_LOADING_FINISHED,
  ON_PAY_LOADING_START,
  ON_PAY_LOADING_FINISHED,
  ON_BIG_BANNER_LOADING_START,
  ON_BIG_BANNER_LOADING_FINISHED,
  ON_POPUP_LOADING_START,
  ON_POPUP_LOADING_FINISHED,
  ON_RDC_LOADING_START,
  ON_RDC_LOADING_FINISHED,
  ON_REDIRECT_LOADING_START,
  ON_REDIRECT_LOADING_FINISHED,
  ON_FORGOTTEN_EMAIL_LOADING_START,
  ON_FORGOTTEN_EMAIL_LOADING_FINISHED,
  ON_REDIRECT_PAYMENT_LOADING_START,
  ON_REDIRECT_PAYMENT_LOADING_FINISHED,
  ON_ADD_OR_REMOVE_EDE_FROM_CART_START,
  ON_ADD_OR_REMOVE_EDE_FROM_CART_FINISHED,
  ON_GET_KLAVIYO_SUSCRIBERS_START,
  ON_GET_KLAVIYO_SUSCRIBERS_FINISHED,
  ON_LOADING_GET_DNI_START,
  ON_LOADING_GET_DNI_FINISHED,
} from "./loadingConstants";

import { ILoadingState } from "./types";

const initialState: ILoadingState = {};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ON_GET_KLAVIYO_SUSCRIBERS_START:
      return {
        ...state,
        loadingKlaviyoSuscribers: true,
      };

    case ON_REDIRECT_LOADING_START:
      return {
        ...state,
        loadingRedirect: true,
      };

    case ON_FORGOTTEN_EMAIL_LOADING_START:
      return {
        ...state,
        loadingForgottenEmail: true,
      };

    case ON_GET_CART_LOADING_START:
      return {
        ...state,
        loadingGetCart: true,
      };

    case ON_RDC_LOADING_START:
      return {
        ...state,
        loadingRDCEmail: true,
      };

    case ON_PAY_LOADING_START:
      return {
        ...state,
        loadingPay: true,
      };
    case ON_POPUP_LOADING_START:
      return {
        ...state,
        loadingPopupEmail: true,
      };

    case ON_GET_CART_LOADING_START:
      return {
        ...state,
        loadingGetCart: true,
      };

    case ON_ADD_TO_CART_LOADING_START:
      return {
        ...state,
        loadingAddToCart: true,
      };

    case ON_UPDATE_TO_CART_LOADING_START:
      return {
        ...state,
        loadingUpdateToCart: true,
      };

    case ON_DELETE_TO_CART_LOADING_START:
      return {
        ...state,
        loadingDeleteToCart: true,
      };

    case ON_ADD_COUPON_LOADING_START:
      return {
        ...state,
        loadingAddCoupon: true,
      };

    case ON_DELETE_COUPON_LOADING_START:
      return {
        ...state,
        loadingDeleteCoupon: true,
      };

    case ON_CALC_SHIPPING_COST_LOADING_START:
      return {
        ...state,
        loadingCalcShippingCost: true,
      };

    case ON_EMPTY_CART_LOADING_START:
      return {
        ...state,
        loadingEmptyCart: true,
      };

    case ON_START_BUY_LOADING_START:
      return {
        ...state,
        loadingStartBuy: true,
      };

    case ON_GET_ORDER_LOADING_START:
      return {
        ...state,
        loadingGetOrder: true,
      };

    case ON_SUBSCRIBE_STOCKOUT_LOADING_START:
      return {
        ...state,
        loadingSubscribeStockout: true,
      };

    case ON_NEWSLETTER_LOADING_START:
      return {
        ...state,
        loadingNewsletter: true,
      };

    case ON_GET_CARD_INFO_LOADING_START:
      return {
        ...state,
        loadingGetCardInfo: true,
      };
    case ON_CHECKOUT_NEWS_LOADING_START:
      return {
        ...state,
        loadingCheckOutNews: true,
      };
    case ON_ADD_OR_REMOVE_EDE_FROM_CART_START:
      return {
        ...state,
        loadingAddOrRemoveEdeFromCart: true,
      };

    case ON_REDIRECT_PAYMENT_LOADING_START:
      return {
        ...state,
        loadingPaymentRedirect: true,
      };

    case ON_GET_KLAVIYO_SUSCRIBERS_START:
      return {
        ...state,
        loadingKlaviyoSuscribers: true,
      };
    case ON_LOADING_GET_DNI_START:
      return {
        ...state,
        loadingGetOrderDni: true,
      };

    case ON_GET_CART_LOADING_FINISHED:
      return {
        ...state,
        loadingGetCart: false,
      };
    case ON_ADD_TO_CART_LOADING_FINISHED:
      return {
        ...state,
        loadingAddToCart: false,
      };
    case ON_GET_CART_LOADING_FINISHED:
      return {
        ...state,
        loadingGetCart: false,
      };
    case ON_UPDATE_TO_CART_LOADING_FINISHED:
      return {
        ...state,
        loadingUpdateToCart: false,
      };
    case ON_BIG_BANNER_LOADING_START:
      return {
        ...state,
        loadingBigBannerEmail: true,
      };

    case ON_DELETE_TO_CART_LOADING_FINISHED:
      return {
        ...state,
        loadingDeleteToCart: false,
      };

    case ON_ADD_COUPON_LOADING_FINISHED:
      return {
        ...state,
        loadingAddCoupon: false,
      };

    case ON_DELETE_COUPON_LOADING_FINISHED:
      return {
        ...state,
        loadingDeleteCoupon: false,
      };

    case ON_CALC_SHIPPING_COST_LOADING_FINISHED:
      return {
        ...state,
        loadingCalcShippingCost: false,
      };

    case ON_EMPTY_CART_LOADING_FINISHED:
      return {
        ...state,
        loadingEmptyCart: false,
      };

    case ON_START_BUY_LOADING_FINISHED:
      return {
        ...state,
        loadingStartBuy: false,
      };

    case ON_GET_ORDER_LOADING_FINISHED:
      return {
        ...state,
        loadingGetOrder: false,
      };

    case ON_SUBSCRIBE_STOCKOUT_LOADING_FINISHED:
      return {
        ...state,
        loadingSubscribeStockout: false,
      };

    case ON_NEWSLETTER_LOADING_FINISHED:
      return {
        ...state,
        loadingNewsletter: false,
      };
    case ON_GET_CARD_INFO_LOADING_FINISHED:
      return {
        ...state,
        loadingGetCardInfo: false,
      };
    case ON_CHECKOUT_NEWS_LOADING_FINISHED:
      return {
        ...state,
        loadingCheckOutNews: false,
      };
    case ON_PAY_LOADING_FINISHED:
      return {
        ...state,
        loadingPay: false,
      };
    case ON_BIG_BANNER_LOADING_FINISHED:
      return {
        ...state,
        loadingBigBannerEmail: false,
      };
    case ON_POPUP_LOADING_FINISHED:
      return {
        ...state,
        loadingPopupEmail: false,
      };
    case ON_RDC_LOADING_FINISHED:
      return {
        ...state,
        loadingRDCEmail: false,
      };
    case ON_REDIRECT_LOADING_FINISHED:
      return {
        ...state,
        loadingRedirect: false,
      };
    case ON_REDIRECT_LOADING_FINISHED:
      return {
        ...state,
        loadingRedirect: false,
      };
    case ON_REDIRECT_PAYMENT_LOADING_FINISHED:
      return {
        ...state,
        loadingPaymentRedirect: false,
      };
    case ON_FORGOTTEN_EMAIL_LOADING_FINISHED:
      return {
        ...state,
        loadingForgottenEmail: false,
      };
    case ON_ADD_OR_REMOVE_EDE_FROM_CART_FINISHED:
      return {
        ...state,
        loadingAddOrRemoveEdeFromCart: false,
      };
    case ON_GET_KLAVIYO_SUSCRIBERS_FINISHED:
      return {
        ...state,
        loadingKlaviyoSuscribers: false,
      };
    case ON_LOADING_GET_DNI_FINISHED:
      return {
        ...state,
        loadingGetOrderDni: false,
      };
    default:
      return state;
  }
};
