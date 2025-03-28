import { createSelector } from "@reduxjs/toolkit";
import { IStore } from "../types";

export const getCurrentProductsRelated = createSelector((state: IStore) => state.products.currentProductsRelated, currentProductsRelated => currentProductsRelated);

export const getProductsData = createSelector((state: IStore) => state.products.productsData, productsData => productsData);

export const getAllProductsData = createSelector((state: IStore) => state.products.allProductsData, allProductsData => allProductsData);

export const getDefaultProducts = createSelector((state: IStore) => state.products.defaultProducts, defaultProducts => defaultProducts);

export const getShippintTime = createSelector((state: IStore) => state.products.shippingTime, shippingTime => shippingTime);

export const getHolidays = createSelector((state: IStore) => state.products.holidays, holidays => holidays);

export const getStock = createSelector((state: IStore) => state.products.stock, stock => stock);

export const getStockAndPrices = createSelector((state: IStore) => state.products.stockAndPricesData, stockAndPricesData => stockAndPricesData);

export const getUnavailableDays = createSelector((state: IStore) => state.products.unavailableDays, unavailableDays => unavailableDays);

export const getNuevosDisenos = createSelector((state: IStore) => state.products.nuevosDisenos, nuevosDisenos => nuevosDisenos);

export const getQuizzOpen = createSelector((state: IStore) => state.products.isQuizzOpen, isQuizzOpen => isQuizzOpen);

export const getOverlay = createSelector((state: IStore) => state.products.overlay, overlay => overlay);

export const getIsNavbarVisible = createSelector((state: IStore) => state.products.isNavbarVisible, isNavbarVisible => isNavbarVisible);

export const getRelampagoProduct = createSelector((state: IStore) => state.products.relampagoProduct, relampagoProduct => relampagoProduct);