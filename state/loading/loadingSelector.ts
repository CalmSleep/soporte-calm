import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";

export const getLoadingAddToCart = createSelector(
  (state: IStore) => state.loading.loadingAddToCart,
  (loadingAddToCart) => loadingAddToCart
);

export const getLoadingAddOrUpdateCart = createSelector(
  (state: IStore) => state.loading,
  (loading) => loading.loadingAddToCart ?? loading.loadingUpdateToCart
);

export const getLoadingSubscribeStockout = createSelector(
  (state: IStore) => state.loading.loadingSubscribeStockout,
  (loadingSubscribeStockout) => loadingSubscribeStockout
);

export const getLoadingNewsletter = createSelector(
  (state: IStore) => state.loading.loadingNewsletter,
  (loadingNewsletter) => loadingNewsletter
);

export const getLoadingValues = createSelector(
  (state: IStore) => state.loading,
  (loading) => loading
);

export const getLoadingCardInfo = createSelector(
  (state: IStore) => state.loading.loadingGetCardInfo,
  (loadingGetCardInfo) => loadingGetCardInfo
);

export const getLoadingCheckOutNews = createSelector(
  (state: IStore) => state.loading.loadingCheckOutNews,
  (loadingCheckOutNews) => loadingCheckOutNews
);

export const getLoadingGetCart = createSelector(
  (state: IStore) => state.loading,
  (loading) => loading.loadingGetCart
);

export const getLoadingPay = createSelector(
  (state: IStore) => state.loading.loadingPay,
  (loadingPay) => loadingPay
);

export const getLoadingRedirect = createSelector(
  (state: IStore) => state.loading.loadingRedirect,
  (loadingRedirect) => loadingRedirect
);

export const getLoadingEmptyCart = createSelector(
  (state: IStore) => state.loading.loadingEmptyCart,
  (loadingEmptyCart) => loadingEmptyCart
);

export const getLoadingRDC = createSelector(
  (state: IStore) => state.loading.loadingRDCEmail,
  (loadingRDCEmail) => loadingRDCEmail
);

export const getLoadingPaymentRedirect = createSelector(
  (state: IStore) => state.loading.loadingPaymentRedirect,
  (loadingPaymentRedirect) => loadingPaymentRedirect
);

export const getLoadingKlaviyoSuscribers = createSelector(
  (state: IStore) => state.loading.loadingKlaviyoSuscribers,
  (loadingKlaviyoSuscribers) => loadingKlaviyoSuscribers
);

export const getLoadingGetOrderDni = createSelector(
  (state: IStore) => state.loading.loadingGetOrderDni,
  (loadingGetOrderDni) => loadingGetOrderDni
);
