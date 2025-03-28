import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";

export const getPaymentIntentionModo = createSelector(
  (state: IStore) => state.modo,
  (modoData) => modoData
);
