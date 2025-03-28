import { AnyAction } from '@reduxjs/toolkit';
import {
  ON_GET_CART_FAILED,
  ON_GET_CART_SUCCEEDED,
  ON_ADD_ITEM_TO_CART_FAILED,
  ON_ADD_ITEM_TO_CART_SUCCEEDED,
  ON_REMOVE_ITEM_FROM_CART_FAILED,
  ON_REMOVE_ITEM_FROM_CART_SUCCEEDED,
  ON_UPDATE_ITEM_FROM_CART_SUCCEEDED,
  ON_UPDATE_ITEM_FROM_CART_FAILED,
  ON_CLEAR_CART_SUCCEEDED,
  ON_ADD_COUPON_TO_CART_SUCCEEDED,
  ON_REMOVE_COUPON_TO_CART_SUCCEEDED,
  ON_UPDATE_SHIPPING_FROM_CART_SUCCEEDED,
  ON_CLEAR_CART_FAILED,
  ON_ADD_COUPON_TO_CART_FAILED,
  ON_REMOVE_COUPON_TO_CART_FAILED,
  ON_UPDATE_SHIPPING_FROM_CART_FAILED,
  ON_GET_CART_RELATED_PRODUCTS_FAILED,
  ON_GET_CART_RELATED_PRODUCTS_SUCCEEDED,
  ON_OPEN_SIDECART,
  ON_CLOSE_SIDECART,
  ON_GET_VARIATION_SUCCEEDED,
  ON_GET_VARIATION_FAILED,
  ON_UPDATE_CART_DATA_WITH_SESSION,
  ON_SHOW_FIXEDCART,
  ON_CLOSE_FIXEDCART,
  ON_VISIBLE_FIXEDCART,
  ON_NOTVISIBLE_FIXEDCART,
  ON_MOBILE_MENU_OPEN,
  ON_MOBILE_MENU_CLOSE,
  ON_GET_ALL_CART_RELATED_PRODUCTS_FAILED,
  ON_GET_ALL_CART_RELATED_PRODUCTS_SUCCEEDED,
  ON_GET_ALL_VARIATION_SUCCEEDED,
  ON_OPEN_CHAT,
  ON_CLOSE_CHAT,
  ON_SHOW_ABANDONO_POPUP,
  ON_HIDE_ABANDONO_POPUP
} from './cartConstants';
import { ICartState } from './types';

const initialState: ICartState = {
  error: false,
  openSideCart: false,
  showFixedCart: false,
  isATCVisible: false
}

export default (state = initialState, action: AnyAction) => {

  switch (action.type) {
    case ON_GET_CART_SUCCEEDED:
    case ON_REMOVE_ITEM_FROM_CART_SUCCEEDED:
    case ON_UPDATE_ITEM_FROM_CART_SUCCEEDED:
    case ON_CLEAR_CART_SUCCEEDED:
    case ON_ADD_COUPON_TO_CART_SUCCEEDED:
    case ON_REMOVE_COUPON_TO_CART_SUCCEEDED:
    case ON_UPDATE_SHIPPING_FROM_CART_SUCCEEDED:
      return {
        ...state,
        cartData: action.cartData.dataCart.data,
        error: false,
        errorDetail: undefined,
        addToCartErrorDetail: undefined
      };

    case ON_SHOW_ABANDONO_POPUP:
      return {
        ...state,
        abandonoPopup: true
      };

    case ON_ADD_ITEM_TO_CART_SUCCEEDED:
      return {
        ...state,
        cartData: action.cartData.dataCart.data,
        openSideCart: true,
        error: false,
        errorDetail: undefined,
        addToCartErrorDetail: undefined
      };

    case ON_GET_VARIATION_SUCCEEDED:
      return {
        ...state,
        variationsData: state.variationsData ? state.variationsData.concat(action.variationData) : [action.variationData]
      }

    case ON_GET_ALL_VARIATION_SUCCEEDED:
      return {
        ...state,
        variationsData: action.variationsData
      }

    case ON_GET_CART_RELATED_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        currentProductsRelated: action.productData
      };

    case ON_GET_ALL_CART_RELATED_PRODUCTS_SUCCEEDED:
        return {
          ...state,
          allProductsRelatedByID: action.productData
        };

    case ON_MOBILE_MENU_OPEN:
      return {
        ...state,
        isMobileMenuOpen: true
      };
    case ON_MOBILE_MENU_CLOSE:
      return {
        ...state,
        isMobileMenuOpen: false
      };
    case ON_GET_CART_FAILED:
    case ON_GET_VARIATION_FAILED:
    case ON_REMOVE_ITEM_FROM_CART_FAILED:
    case ON_UPDATE_ITEM_FROM_CART_FAILED:
    case ON_CLEAR_CART_FAILED:
    case ON_ADD_COUPON_TO_CART_FAILED:
      return {
        ...state,
        error: true,
        errorDetail: action.errorDetail
      };
    case ON_ADD_ITEM_TO_CART_FAILED:
      return {
        ...state,
        error: true,
        addToCartErrorDetail: action.errorDetail ?? undefined
      }
    case ON_REMOVE_COUPON_TO_CART_FAILED:
    case ON_UPDATE_SHIPPING_FROM_CART_FAILED:
    case ON_GET_CART_RELATED_PRODUCTS_FAILED:
    case ON_GET_ALL_CART_RELATED_PRODUCTS_FAILED:
      return {
        ...state,
        error: true,
      };
    case ON_OPEN_SIDECART:
      if(!state.error) {
        return {
          ...state,
          openSideCart: true
        };
      } else {
        return state
      }
    case ON_CLOSE_SIDECART:
      return {
        ...state,
        openSideCart: false
      };
    case ON_SHOW_FIXEDCART:
      return {
        ...state,
        showFixedCart: true
      };
      
    case ON_OPEN_CHAT:
      return {
        ...state,
        isChatOpen: true
      };
    case ON_CLOSE_CHAT:
      return {
        ...state,
        isChatOpen: false
      };
    case ON_VISIBLE_FIXEDCART:
      return {
        ...state,
        isATCVisible: true
      };
      
    case ON_CLOSE_FIXEDCART:
      return {
        ...state,
        showFixedCart: false
      };
    case ON_NOTVISIBLE_FIXEDCART:
      return {
        ...state,
        isATCVisible: false
      };
    case ON_UPDATE_CART_DATA_WITH_SESSION:
      return {
        ...state,
        cartData: JSON.parse(action.cartData)
      }
    case ON_HIDE_ABANDONO_POPUP:
      return {
        ...state,
        abandonoPopup: false
      };
    default:
      return state;
  }
};