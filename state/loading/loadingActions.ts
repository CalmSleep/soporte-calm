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
  ON_GET_ORDER_LOADING_FINISHED,
  ON_GET_ORDER_LOADING_START,
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
  ON_REDIRECT_PAYMENT_LOADING_FINISHED,
  ON_REDIRECT_PAYMENT_LOADING_START,
  ON_ADD_OR_REMOVE_EDE_FROM_CART_START,
  ON_ADD_OR_REMOVE_EDE_FROM_CART_FINISHED,
  ON_GET_KLAVIYO_SUSCRIBERS_START,
  ON_GET_KLAVIYO_SUSCRIBERS_FINISHED,
  ON_LOADING_GET_DNI_START,
  ON_LOADING_GET_DNI_FINISHED,
  ON_LOADING_GET_PRODUCTS_START,
  ON_LOADING_GET_PRODUCTS_FINISHED,
} from "./loadingConstants";

export const onGetForgottenEmailLoadingStart = () => ({
  type: ON_FORGOTTEN_EMAIL_LOADING_START,
});

export const onGetForgottenEmailLoadingFinished = () => ({
  type: ON_FORGOTTEN_EMAIL_LOADING_FINISHED,
});

export const onGetPayLoadingStart = () => ({
  type: ON_PAY_LOADING_START,
});

export const onGetPayLoadingFinished = () => ({
  type: ON_PAY_LOADING_FINISHED,
});

export const onGetCartLoadingStart = () => ({
  type: ON_GET_CART_LOADING_START,
});

export const onGetCartLoadingFinished = () => ({
  type: ON_GET_CART_LOADING_FINISHED,
});

export const onAddToCartLoadingStart = () => ({
  type: ON_ADD_TO_CART_LOADING_START,
});

export const onAddToCartLoadingFinished = () => ({
  type: ON_ADD_TO_CART_LOADING_FINISHED,
});

export const onUpdateToCartLoadingStart = () => ({
  type: ON_UPDATE_TO_CART_LOADING_START,
});

export const onUpdateToCartLoadingFinished = () => ({
  type: ON_UPDATE_TO_CART_LOADING_FINISHED,
});

export const onDeleteToCartLoadingStart = () => ({
  type: ON_DELETE_TO_CART_LOADING_START,
});

export const onDeleteToCartLoadingFinished = () => ({
  type: ON_DELETE_TO_CART_LOADING_FINISHED,
});

export const onAddCouponLoadingStart = () => ({
  type: ON_ADD_COUPON_LOADING_START,
});

export const onAddCouponLoadingFinished = () => ({
  type: ON_ADD_COUPON_LOADING_FINISHED,
});

export const onDeleteCouponLoadingStart = () => ({
  type: ON_DELETE_COUPON_LOADING_START,
});

export const onDeleteCouponLoadingFinished = () => ({
  type: ON_DELETE_COUPON_LOADING_FINISHED,
});

export const onCalcShippingCostLoadingStart = () => ({
  type: ON_CALC_SHIPPING_COST_LOADING_START,
});

export const onCalcShippingCostLoadingFinished = () => ({
  type: ON_CALC_SHIPPING_COST_LOADING_FINISHED,
});

export const onEmptyCartLoadingStart = () => ({
  type: ON_EMPTY_CART_LOADING_START,
});

export const onEmptyCartLoadingFinished = () => ({
  type: ON_EMPTY_CART_LOADING_FINISHED,
});

export const onStartBuyLoadingStart = () => ({
  type: ON_START_BUY_LOADING_START,
});

export const onStartBuyLoadingFinished = () => ({
  type: ON_START_BUY_LOADING_FINISHED,
});

export const onGetOrderLoadingStart = () => ({
  type: ON_GET_ORDER_LOADING_START,
});

export const onGetOrderLoadingFinished = () => ({
  type: ON_GET_ORDER_LOADING_FINISHED,
});

export const onSubscribeStockoutLoadingStart = () => ({
  type: ON_SUBSCRIBE_STOCKOUT_LOADING_START,
});

export const onSubscribeStockoutLoadingFinished = () => ({
  type: ON_SUBSCRIBE_STOCKOUT_LOADING_FINISHED,
});

export const onNewsletterLoadingStart = () => ({
  type: ON_NEWSLETTER_LOADING_START,
});

export const onNewsletterLoadingFinished = () => ({
  type: ON_NEWSLETTER_LOADING_FINISHED,
});

export const onGetCardInfoLoadingStart = () => ({
  type: ON_GET_CARD_INFO_LOADING_START,
});

export const onGetCardInfoLoadingFinished = () => ({
  type: ON_GET_CARD_INFO_LOADING_FINISHED,
});

export const onCheckOutNewsLoadingStart = () => ({
  type: ON_CHECKOUT_NEWS_LOADING_START,
});

export const onCheckOutNewsLoadingFinished = () => ({
  type: ON_CHECKOUT_NEWS_LOADING_FINISHED,
});

export const onBigBannerLoadingStart = () => ({
  type: ON_BIG_BANNER_LOADING_START,
});

export const onBigBannerLoadingFinished = () => ({
  type: ON_BIG_BANNER_LOADING_FINISHED,
});

export const onPopupLoadingStart = () => ({
  type: ON_POPUP_LOADING_START,
});

export const onPopupLoadingFinished = () => ({
  type: ON_POPUP_LOADING_FINISHED,
});

export const onRDCLoadingStart = () => ({
  type: ON_RDC_LOADING_START,
});

export const onRDCLoadingFinished = () => ({
  type: ON_RDC_LOADING_FINISHED,
});
export const onRedirectLoadingStart = () => ({
  type: ON_REDIRECT_LOADING_START,
});

export const onRedirectLoadingFinished = () => ({
  type: ON_REDIRECT_LOADING_FINISHED,
});

export const onRedirectPaymentLoadingStart = () => ({
  type: ON_REDIRECT_PAYMENT_LOADING_START,
});

export const onRedirectPaymentLoadingFinished = () => ({
  type: ON_REDIRECT_PAYMENT_LOADING_FINISHED,
});

export const onAddOrRemoveEdeFromCartStart = () => ({
  type: ON_ADD_OR_REMOVE_EDE_FROM_CART_START,
});

export const onAddOrRemoveEdeFromCartFinished = () => ({
  type: ON_ADD_OR_REMOVE_EDE_FROM_CART_FINISHED,
});

export const onGetKlaviyoSuscribersStart = () => ({
  type: ON_GET_KLAVIYO_SUSCRIBERS_START,
});

export const onGetKlaviyoSuscribersFinished = () => ({
  type: ON_GET_KLAVIYO_SUSCRIBERS_FINISHED,
});

export const onLoadingGetDniStart = () => ({
  type: ON_LOADING_GET_DNI_START,
});

export const onLoadingGetDniFinished = () => ({
  type: ON_LOADING_GET_DNI_FINISHED,
});

export const onLoadingGetProductsStart = () => ({
  type: ON_LOADING_GET_PRODUCTS_START,
});

export const onLoadingGetProductsFinished = () => ({
  type: ON_LOADING_GET_PRODUCTS_FINISHED,
});
