import { AnyAction } from '@reduxjs/toolkit';
import {
  ON_GET_HOME_RELATED_PRODUCTS_FAILED,
  ON_GET_HOME_RELATED_PRODUCTS_SUCCEEDED,
  ON_GET_NEW_RELATED_PRODUCTS_FAILED,
  ON_GET_NEW_RELATED_PRODUCTS_SUCCEEDED,
  ON_GET_PRODUCT_FAILED,
  ON_GET_PRODUCT_SUCCEEDED,
  ON_GET_ALL_PRODUCTS_FAILED,
  ON_GET_ALL_PRODUCTS_SUCCEEDED,
  ON_GET_RELATED_PRODUCTS_FAILED,
  ON_GET_RELATED_PRODUCTS_SUCCEEDED,
  ON_GET_DEFAULT_PRODUCTS_FAILED,
  ON_GET_DEFAULT_PRODUCTS_SUCCEEDED,
  ON_GET_SHIPPING_TIME_SUCCEEDED,
  ON_GET_SHIPPING_TIME_FAILED,
  ON_GET_HOLIDAYS_SUCCEEDED,
  ON_GET_HOLIDAYS_FAILED,
  ON_GET_STOCK_SUCCEEDED,
  ON_GET_STOCK_FAILED,
  ON_GET_STOCK_AND_PRICES_SUCCEEDED,
  ON_GET_STOCK_AND_PRICES_FAILED,
  ON_OPEN_QUIZZ_SUCCEEDED,
  ON_CLOSE_QUIZZ_FAILED,
  ON_GET_UNAVAILABLE_DAYS_FAILED,
  ON_GET_UNAVAILABLE_DAYS_SUCCEEDED,
  ON_GET_NUEVOS_DISENOS_SUCCEEDED,
  ON_GET_NUEVOS_DISENOS_FAILED,
  ON_GET_OPEN_OVERLAY,
  ON_GET_CLOSE_OVERLAY,
  ON_GET_SHOW_NAVBAR,
  ON_GET_HIDE_NAVBAR,
  ON_GET_RELAMPAGO_PRODUCT_SUCCEEDED,
  ON_GET_RELAMPAGO_PRODUCT_FAILED
} from './productsConstants';
import { IProductState } from './types';

const initialState: IProductState = {
  error: false,
  isQuizzOpen: false,
}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ON_GET_PRODUCT_SUCCEEDED:
      return {
        ...state,
        productsData: state.productsData ? state.productsData.concat(action.productData) : [action.productData]
      };
    case ON_GET_ALL_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        allProductsData: action.allProductsData
      };
    case ON_GET_RELAMPAGO_PRODUCT_SUCCEEDED:
      return {
        ...state,
        relampagoProduct: action.relampagoData
      };

    case ON_GET_HOME_RELATED_PRODUCTS_SUCCEEDED:
    case ON_GET_RELATED_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        currentProductsRelated: action.productData
      };
    case ON_GET_NUEVOS_DISENOS_SUCCEEDED:
      return {
        ...state,
        nuevosDisenos: action.flag
      };
    case ON_GET_SHOW_NAVBAR:
      return {
        ...state,
        isNavbarVisible: true
      };
    case ON_GET_OPEN_OVERLAY:
      return {
        ...state,
        overlay: true
      };
    case ON_OPEN_QUIZZ_SUCCEEDED:
      return {
        ...state,
        isQuizzOpen: true
      };
    case ON_GET_NEW_RELATED_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        newProductsRelated: action.productData
      };
    case ON_GET_DEFAULT_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        defaultProducts: action.defaultProducts
      }
    case ON_GET_SHIPPING_TIME_SUCCEEDED:
      return {
        ...state,
        shippingTime: action.shippingTime
      }
    case ON_GET_HOLIDAYS_SUCCEEDED:
      return {
        ...state,
        holidays: action.holidays
      }
    case ON_GET_STOCK_SUCCEEDED:
      return {
        ...state,
        stock: action.stock
      }
    case ON_GET_STOCK_AND_PRICES_SUCCEEDED:
      return {
        ...state,
        stockAndPricesData: action.data
      }
    case ON_GET_UNAVAILABLE_DAYS_SUCCEEDED:
      return {
        ...state,
        unavailableDays: action.days
      }
    case ON_GET_NUEVOS_DISENOS_FAILED:
      return {
        ...state,
        nuevosDisenos: action.flag
      };
    case ON_CLOSE_QUIZZ_FAILED:
      return {
        ...state,
        isQuizzOpen: false
      };
    case ON_GET_CLOSE_OVERLAY:
      return {
        ...state,
        overlay: false
      };
    case ON_GET_HIDE_NAVBAR:
      return {
        ...state,
        isNavbarVisible: false
      };
    case ON_GET_PRODUCT_FAILED:
    case ON_GET_ALL_PRODUCTS_FAILED:
    case ON_GET_HOME_RELATED_PRODUCTS_FAILED:
    case ON_GET_RELATED_PRODUCTS_FAILED:
    case ON_GET_NEW_RELATED_PRODUCTS_FAILED:
    case ON_GET_DEFAULT_PRODUCTS_FAILED:
    case ON_GET_SHIPPING_TIME_FAILED:
    case ON_GET_HOLIDAYS_FAILED:
    case ON_GET_STOCK_FAILED:
    case ON_GET_STOCK_AND_PRICES_FAILED:
    case ON_GET_UNAVAILABLE_DAYS_FAILED:
    case ON_GET_RELAMPAGO_PRODUCT_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};