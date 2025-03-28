import { AnyAction } from "@reduxjs/toolkit";
import { IFormData } from "./types";
import { ON_GET_IS_PICKUP } from "./formDataConstants";

const initialState: IFormData = {};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ON_GET_IS_PICKUP:
      return {
        ...state,
        isPickup: action.isPickup,
      };
    default:
      return state;
  }
};
