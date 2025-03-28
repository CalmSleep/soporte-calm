import { AnyAction } from '@reduxjs/toolkit';
import {
    ON_ADD_EMAIL_TO_NEWSLETTER_FAILED,
    ON_ADD_EMAIL_TO_NEWSLETTER_SUCCEEDED,
    ON_SUBSCRIBE_STOCKOUT_SUCCEEDED,
    ON_SUBSCRIBE_STOCKOUT_FAILED,
    ON_CLEAN_ERRORS_NEWSLETTER,
    ON_CLEAN_ERRORS_STOCKOUT,
    ON_ADD_EMAIL_TO_CHECKOUT_NEWS_SUCCEEDED,
    ON_ADD_EMAIL_TO_CHECKOUT_NEWS_FAILED,
    ON_BIG_BANNER_SUCCEEDED,
    ON_BIG_BANNER_FAILED,
    ON_POPUP_SUCCEEDED,
    ON_POPUP_FAILED,
    ON_GET_KLAVIYO_SUSCRIBERS_SUCCEEDED,
    ON_GET_KLAVIYO_SUSCRIBERS_FAILED
} from "./mailchimpConstants";
import { IMailchimp } from './types';

const initialState: IMailchimp = {
    newsletter: {
        error: false,
        errorMessage: '',
        response: {
            message: ''
        }
    },
    subscribeStockOut: {
        error: false,
        errorMessage: '',
        response: {
            message: ''
        }
    },
    checkoutNews: {
        error: false,
        errorMessage: '',
        response: {
            message: ''
        }
    },
    bigBanner: {
        error: false,
        errorMessage: '',
        response: {
            message: ''
        }
    },
    popup: {
        error: false,
        errorMessage: '',
        response: {
            message: ''
        }
    },
}

export default (state = initialState, action: AnyAction) => {

    switch (action.type) {

        case ON_GET_KLAVIYO_SUSCRIBERS_SUCCEEDED:
            return {
                ...state,
                klaviyoSuscribersError: false,
                klaviyoSuscribers: action.data
            }

        case ON_GET_KLAVIYO_SUSCRIBERS_FAILED:
            return {
                ...state,
                klaviyoSuscribersError: true
            }

        case ON_CLEAN_ERRORS_STOCKOUT:
            return {
                ...state,
                subscribeStockOut: {
                    error: false,
                    errorMessage: '',
                    response: {
                        message: ''
                    }
                }
            };

        case ON_CLEAN_ERRORS_NEWSLETTER:
            return {
                ...state,
                newsletter: {
                    error: false,
                    errorMessage: '',
                    response: {
                        message: ''
                    }
                }
            };

        case ON_POPUP_SUCCEEDED:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    response: action.subscribe,
                }
            };

        case ON_SUBSCRIBE_STOCKOUT_SUCCEEDED:
            return {
                ...state,
                subscribeStockOut: {
                    ...state.subscribeStockOut,
                    response: action.subscribe,
                }
            };
        case ON_ADD_EMAIL_TO_CHECKOUT_NEWS_SUCCEEDED:
            return {
                ...state,
                checkoutNews: {
                    ...state.checkoutNews,
                    response: action.checkoutNews,
                }
            };

        case ON_BIG_BANNER_SUCCEEDED:
            return {
                ...state,
                bigBanner: {
                    ...state.bigBanner,
                    response: action.subscribe,
                }
            };

        case ON_ADD_EMAIL_TO_NEWSLETTER_SUCCEEDED:
            return {
                ...state,
                newsletter: {
                    ...state.newsletter,
                    response: action.newsletter,
                }
            };

        case ON_ADD_EMAIL_TO_NEWSLETTER_FAILED:
            return {
                ...state,
                newsletter: {
                    ...state.newsletter,
                    error: true,
                    errorMessage: action.error && action.error.error ? action.error.error : undefined
                }
            };

        case ON_SUBSCRIBE_STOCKOUT_FAILED:
            return {
                ...state,
                subscribeStockOut: {
                    ...state.subscribeStockOut,
                    error: true,
                    errorMessage: action.error && action.error.error ? action.error.error : undefined
                }
            };
        
        case ON_BIG_BANNER_FAILED:
            return {
                ...state,
                bigBanner: {
                    ...state.bigBanner,
                    error: true,
                    errorMessage: action.error && action.error.error ? action.error.error : undefined
                }
            };

        case ON_POPUP_FAILED:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    error: true,
                    errorMessage: action.error && action.error.error ? action.error.error : undefined
                }
            };

        case ON_ADD_EMAIL_TO_CHECKOUT_NEWS_FAILED:
            return {
                ...state,
                checkoutNews: {
                    ...state.checkoutNews,
                    error: true,
                    errorMessage: action.error && action.error.error ? action.error.error : undefined
                }
            };

        default:
            return state;
    }
}