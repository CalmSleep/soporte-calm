import { onAddItemToCart, onRemoveItemFromCart } from "../cart/cartActions";
import { getCart } from "../cart/cartServices";
import { IItem } from "../cart/types";
import { onPopupLoadingStart, onPopupLoadingFinished, onNewsletterLoadingFinished, onNewsletterLoadingStart, onBigBannerLoadingStart, onBigBannerLoadingFinished, onSubscribeStockoutLoadingFinished, onSubscribeStockoutLoadingStart, onCheckOutNewsLoadingStart, onCheckOutNewsLoadingFinished, onAddToCartLoadingStart, onAddToCartLoadingFinished, onGetKlaviyoSuscribersStart, onGetKlaviyoSuscribersFinished } from "../loading/loadingActions";
import {
    ON_ADD_EMAIL_TO_NEWSLETTER_FAILED,
    ON_ADD_EMAIL_TO_NEWSLETTER_SUCCEEDED,
    ON_SUBSCRIBE_STOCKOUT_SUCCEEDED,
    ON_SUBSCRIBE_STOCKOUT_FAILED,
    ON_CLEAN_ERRORS_NEWSLETTER,
    ON_CLEAN_ERRORS_STOCKOUT,
    ON_ADD_EMAIL_TO_CHECKOUT_NEWS_SUCCEEDED,
    ON_ADD_EMAIL_TO_CHECKOUT_NEWS_FAILED,
    ON_CLEAN_ERRORS_PRE_CYBER,
    ON_BIG_BANNER_SUCCEEDED,
    ON_BIG_BANNER_FAILED,
    ON_POPUP_SUCCEEDED,
    ON_POPUP_FAILED,
    ON_SAVE_ABANDONED_CART_CHECKOUT_SUCCEEDED,
    ON_SAVE_ABANDONED_CART_CHECKOUT_FAILED,
    ON_GET_ABANDONED_CART_CHECKOUT_SUCCEEDED,
    ON_GET_ABANDONED_CART_CHECKOUT_FAILED,
    ON_GET_KLAVIYO_SUSCRIBERS_SUCCEEDED,
    ON_GET_KLAVIYO_SUSCRIBERS_FAILED
} from "./mailchimpConstants";
import { getAbandonedCartCheckout, getKlaviyoSuscribers, onAddEmailToMailchimp, saveAbandonedCartCheckout } from "./mailchimpServices";

export const onAddEmailMailchimp: (email: string, tag: string) => (dispatch: any) => Promise<void> = (email: string, tag: string) => {

    return async (dispatch: any) => {
        try {

            if (tag === "footer") {
                dispatch(onNewsletterLoadingStart())
            } else {
                dispatch(onSubscribeStockoutLoadingStart())
            }

            const response: any = await onAddEmailToMailchimp(email, tag);

            if (response && !response.error) {
                if (tag === "footer") {
                    dispatch(onNewsletterLoadingFinished())
                    dispatch(onAddEmailToNewsletterSucceeded(response));
                } else {
                    dispatch(onSubscribeStockoutLoadingFinished())
                    dispatch(onSubscribeStockoutSucceeded(response));
                }
            } else {
                if (tag === "footer") {
                    dispatch(onNewsletterLoadingFinished())
                    dispatch(onAddEmailToNewsletterFailed(response));
                } else {
                    dispatch(onSubscribeStockoutLoadingFinished())
                    dispatch(onSubscribeStockoutFailed(response));
                }
            };

        } catch (error: any) {
            dispatch(onAddEmailToNewsletterFailed(error));
        }
    };
};

export const onAddEmailToNewsletterFailed = (error: any) => ({
    type: ON_ADD_EMAIL_TO_NEWSLETTER_FAILED,
    error
})

const onAddEmailToNewsletterSucceeded = (newsletter: any) => ({
    type: ON_ADD_EMAIL_TO_NEWSLETTER_SUCCEEDED,
    newsletter
})

const onSubscribeStockoutSucceeded = (subscribe: any) => ({
    type: ON_SUBSCRIBE_STOCKOUT_SUCCEEDED,
    subscribe
})

export const onSubscribeStockoutFailed = (error: any) => ({
    type: ON_SUBSCRIBE_STOCKOUT_FAILED,
    error
})

export const onCleanErrorsNewsletter = () => ({
    type: ON_CLEAN_ERRORS_NEWSLETTER,
})

export const onCleanErrorsStockout = () => ({
    type: ON_CLEAN_ERRORS_STOCKOUT,
})

export const onCleanErrorsPreCyber = () => ({
    type: ON_CLEAN_ERRORS_PRE_CYBER,
})

export const onSuscribeCheckout = (email: string) => {
    return async (dispatch: any) => {
        dispatch(onCheckOutNewsLoadingStart())
      const response = await onAddEmailToMailchimp(email);
      if (response && response.status == 200) {
        dispatch(onAddEmailToCheckOutNewsSucceeded(response));
        dispatch(onCheckOutNewsLoadingFinished())
      } else {
        dispatch(onAddEmailToCheckOutNewsFailed(response));
        dispatch(onCheckOutNewsLoadingFinished())
    }
    }};

export const onAddEmailToCheckOutNewsSucceeded = (checkoutNews: any) => ({
    type: ON_ADD_EMAIL_TO_CHECKOUT_NEWS_SUCCEEDED,
    checkoutNews
})

const onAddEmailToCheckOutNewsFailed = (error: any) => ({
    type: ON_ADD_EMAIL_TO_CHECKOUT_NEWS_FAILED,
    error
})
export const onBigBannerSuscribe = (email: string, tag: string) => {
    return async (dispatch: any) => {
    dispatch(onBigBannerLoadingStart())
    const response = await onAddEmailToMailchimp(email, tag);
  
      if (response && !response.error) {
        dispatch(onBigBannerSucceeded(response));
        dispatch(onBigBannerLoadingFinished())
      } else {
        dispatch(onBigBannerFailed(response));
        dispatch(onBigBannerLoadingFinished())
      }
    };
  };

const onBigBannerSucceeded = (subscribe: any) => ({
    type: ON_BIG_BANNER_SUCCEEDED,
    subscribe
})

const onBigBannerFailed = (error: any) => ({
    type: ON_BIG_BANNER_FAILED,
    error
})

export const onPopupEmail = (email: string, tag: string) => {
    return async (dispatch: any) => {
    dispatch(onPopupLoadingStart())
    const response = await onAddEmailToMailchimp(email, tag);
  
      if (response && !response.error) {
        dispatch(onPopupSucceeded(response));
        dispatch(onPopupLoadingFinished())
      } else {
        dispatch(onPopupFailed(response));
        dispatch(onPopupLoadingFinished())
      }
    };
  };

const onPopupSucceeded = (subscribe: any) => ({
    type: ON_POPUP_SUCCEEDED,
    subscribe
})

const onPopupFailed = (error: any) => ({
    type: ON_POPUP_FAILED,
    error
})

export const onSaveAbandonedCartCheckout = (email: string) => {
    return async (dispatch: any) => {
        try {
            const response = await saveAbandonedCartCheckout(email);

            if (response) {
                dispatch(onSaveAbandonedCartCheckoutSucceeded(response))
            } else {
                dispatch(onSaveAbandonedCartCheckoutFailed(response))
            }
        } catch (error) {
            dispatch(onSaveAbandonedCartCheckoutFailed(error))
        }

    };
};

const onSaveAbandonedCartCheckoutSucceeded = (response: any) => ({
    type: ON_SAVE_ABANDONED_CART_CHECKOUT_SUCCEEDED,
    response
})

const onSaveAbandonedCartCheckoutFailed = (error: any) => ({
    type: ON_SAVE_ABANDONED_CART_CHECKOUT_FAILED,
    error
})

export const onGetAbandonedCartCheckout = (mcCartHash: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(onAddToCartLoadingStart());
            const cart = await getCart();

            if(cart && cart.dataCart.status == 200 && cart.dataCart.data.items) {
                for (const item of (cart.dataCart.data.items as IItem[])) {
                    await dispatch(onRemoveItemFromCart(item.key, "mailchimpActions201"))
                }
            }

            const response = await getAbandonedCartCheckout(mcCartHash);

            if (response.status == 200) {
                for (const item of response.data) {
                    await dispatch(onAddItemToCart(item.id, item.quantity));
                }
            }
            dispatch(onAddToCartLoadingFinished());
        } catch (error) {
            dispatch(onGetAbandonedCartCheckoutFailed(error))
        }

    };
};

const onGetAbandonedCartCheckoutFailed = (error: any) => ({
    type: ON_GET_ABANDONED_CART_CHECKOUT_FAILED,
    error
})

export const onGetKlaviyoSuscribers = (email: string, listId: string) => {
    return async (dispatch: any) => {
        dispatch(onGetKlaviyoSuscribersStart())
        const response = await getKlaviyoSuscribers(email, listId);
        if (response.success) {
            dispatch(onGetKlaviyoSuscribersSucceeded(response.success))
            dispatch(onGetKlaviyoSuscribersFinished())
        } else {
            dispatch(onGetKlaviyoSuscribersFailed(response))
            dispatch(onGetKlaviyoSuscribersFinished())
        }
    }
}

const onGetKlaviyoSuscribersSucceeded = (data: any) => ({
    type: ON_GET_KLAVIYO_SUSCRIBERS_SUCCEEDED,
    data
})

const onGetKlaviyoSuscribersFailed = (error: any) => ({
    type: ON_GET_KLAVIYO_SUSCRIBERS_FAILED,
    error
})
