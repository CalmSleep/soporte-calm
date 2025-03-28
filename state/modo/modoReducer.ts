import { AnyAction } from "@reduxjs/toolkit";
import {
  ON_GET_MODO_RESP_SUCCEEDED,
} from "./modoConstants";
import { IModoResp } from "./types";

const initialState: IModoResp = {}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ON_GET_MODO_RESP_SUCCEEDED:
      return {
        ...state,
        deeplink: action.modoData.deeplink,
        id: action.modoData.id,
        price: action.modoData.price,
        productName: action.modoData.productName,
        qr: action.modoData.qr,
      };
    default:
      return state;
  }
};