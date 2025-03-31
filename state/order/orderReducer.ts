import { AnyAction } from "@reduxjs/toolkit";
import { IOrderState } from "./types";
import {
  ON_GET_ORDER_FAILED,
  ON_GET_ORDER_SUCCEEDED,
  ON_GET_SEGUIMIENTO_SUCCEEDED,
  ON_GET_SEGUIMIENTO_FAILED,
  ON_GET_CARD_INFO_SUCCEEDED,
  ON_GET_CARD_INFO_FAILED,
  ON_SEND_ORDER_DATA_SUCCEEDED,
  ON_SEND_ORDER_DATA_FAILED,
  ON_GET_CPFLOTA_SUCCEEDED,
  ON_GET_CPFLOTA_FAILED,
  ON_GET_TOKEN_FAILED,
  ON_GET_TOKEN_SUCCEEDED,
  ON_GET_DELIVERY_TIMES_SUCCEEDED,
  ON_GET_DELIVERY_TIMES_FAILED,
  ON_VERIFY_ORDER_EXIST_FAILED,
  ON_VERIFY_ORDER_EXIST_SUCCEEDED,
  ON_SET_CHECKOUT_ONLY_TO_PAY,
  ON_SEND_CLEAR_ERROR,
  ON_CLEAN_ORDER_EXISTS,
  ON_GET_RDC_SUCCEEDED,
  ON_GET_RDC_FAILED,
  ON_GET_FORGOTTEN_EMAIL_SUCCEEDED,
  ON_GET_FORGOTTEN_EMAIL_FAILED,
  ON_GET_PUBLIC_IP_SUCCEEDED,
  ON_GET_PUBLIC_IP_FAILED,
  ON_DEFINE_CHECKOUT_PATH_SUCCEEDED,
  ON_GET_CPCABA_SUCCEEDED,
  ON_GET_CPCABA_FAILED,
  ON_GET_ALL_CPS_SUCCEEDED,
  ON_GET_DEFINE_PAYMENT_METHOD,
  ON_GET_TOTAL_WITH_TRANFER_DISCOUNT,
  ON_SET_DATE_TEST,
  ON_SET_TOKEN_ERROR_MESSAGE,
  ON_GET_ORDEN_DNI_SUCCEEDED,
} from "./orderConstants";

const initialState: IOrderState = {};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ON_GET_TOKEN_SUCCEEDED:
      return {
        ...state,
        dataToken: action.dataToken,
      };

    case ON_GET_TOTAL_WITH_TRANFER_DISCOUNT:
      return {
        ...state,
        totalWithTranferDiscount: action.totalWithTranferDiscount,
      };

    case ON_GET_FORGOTTEN_EMAIL_SUCCEEDED:
      return {
        ...state,
        forgottenEmail: action.forgottenEmail,
      };

    case ON_GET_CPCABA_SUCCEEDED:
      return {
        ...state,
        cpCaba: action.cpCaba,
      };

    case ON_GET_RDC_SUCCEEDED:
      return {
        ...state,
        rdcData: action.rdcData,
      };

    case ON_GET_DELIVERY_TIMES_SUCCEEDED:
      return {
        ...state,
        deliveryTimes: action.deliveryTimes,
      };

    case ON_GET_TOKEN_FAILED:
      return {
        ...state,
        errorToken: true,
      };
    case ON_GET_DEFINE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.paymentMethod,
      };
    case ON_DEFINE_CHECKOUT_PATH_SUCCEEDED:
      return {
        ...state,
        pathCheckout: action.path,
      };

    case ON_GET_PUBLIC_IP_SUCCEEDED:
      return {
        ...state,
        ipClient: action.ip_client,
      };

    case ON_SEND_ORDER_DATA_SUCCEEDED:
      return {
        ...state,
        orderCreated: action.orderData,
      };

    case ON_GET_CARD_INFO_SUCCEEDED:
      return {
        ...state,
        cardData: action.cardData,
      };
    case ON_GET_ORDER_SUCCEEDED:
      return {
        ...state,
        thankuContent: action.orderCreated,
      };
    case ON_GET_SEGUIMIENTO_SUCCEEDED:
      return {
        ...state,
        seguimiento: action.seguimientoData,
      };
    case ON_GET_CPFLOTA_SUCCEEDED:
      return {
        ...state,
        cpFlota: action.cpFlota,
      };
    case ON_SEND_ORDER_DATA_FAILED:
    case ON_SEND_CLEAR_ERROR:
      return {
        ...state,
        transactionError: action.transactionError,
      };
    case ON_VERIFY_ORDER_EXIST_SUCCEEDED:
      return {
        ...state,
        orderExist: action.orderExist,
      };
    case ON_SET_CHECKOUT_ONLY_TO_PAY:
      return {
        ...state,
        checkoutOnlyToPay: action.checkoutOnlyToPay,
      };
    case ON_CLEAN_ORDER_EXISTS:
      return {
        ...state,
        orderExist: null,
      };
    case ON_VERIFY_ORDER_EXIST_FAILED:
    case ON_GET_ORDER_FAILED:
    case ON_GET_SEGUIMIENTO_FAILED:
    case ON_GET_CARD_INFO_FAILED:
    case ON_GET_CPFLOTA_FAILED:
    case ON_GET_DELIVERY_TIMES_FAILED:
    case ON_GET_RDC_FAILED:
    case ON_GET_FORGOTTEN_EMAIL_FAILED:
    case ON_GET_PUBLIC_IP_FAILED:
    case ON_GET_CPCABA_FAILED:
      return {
        ...state,
        error: true,
      };
    case ON_GET_ALL_CPS_SUCCEEDED:
      return {
        ...state,
        noShippingCPs: action.noShippingCPs,
      };
    case ON_SET_DATE_TEST:
      return {
        ...state,
        date_test: action.date_test,
      };
    case ON_SET_TOKEN_ERROR_MESSAGE:
      return {
        ...state,
        tokenErrorMessage: action.tokenErrorMessage,
      };
    case ON_GET_ORDEN_DNI_SUCCEEDED:
      return {
        ...state,
        orderData: action.orders,
      };
    default:
      return state;
  }
};
