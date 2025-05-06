import {
  onLoadingGetProductsFinished,
  onLoadingGetProductsStart,
} from "../loading/loadingActions";
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
  ON_GET_DEFAULT_PRODUCTS_SUCCEEDED,
  ON_GET_DEFAULT_PRODUCTS_FAILED,
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
  ON_GET_UNAVAILABLE_DAYS_SUCCEEDED,
  ON_GET_UNAVAILABLE_DAYS_FAILED,
  ON_GET_NUEVOS_DISENOS_SUCCEEDED,
  ON_GET_NUEVOS_DISENOS_FAILED,
  ON_GET_OPEN_OVERLAY,
  ON_GET_CLOSE_OVERLAY,
  ON_GET_SHOW_NAVBAR,
  ON_GET_HIDE_NAVBAR,
  ON_GET_RELAMPAGO_PRODUCT_SUCCEEDED,
  ON_GET_RELAMPAGO_PRODUCT_FAILED,
} from "./productsConstants";

import {
  getRelampagoProduct,
  getDefaultProduct,
  getHomeRelatedProducts,
  getNewRelatedProducts,
  getProduct,
  getAllProducts,
  getRelatedProducts,
  getShippingTime,
  getHolidays,
  getStock,
  getStockAndPrices,
  getUnavailableDays,
  setBackorder,
} from "./productsServices";

export const onGetRelampagoProduct = (id: string) => {
  return async (dispatch: any) => {
    const response = await getRelampagoProduct(id);
    if (response) {
      dispatch(onGetRelampagoProductSucceeded(response));
    } else {
      dispatch(onGetRelampagoProductFailed());
    }
  };
};

const onGetRelampagoProductSucceeded = (relampagoData: any) => ({
  type: ON_GET_RELAMPAGO_PRODUCT_SUCCEEDED,
  relampagoData,
});

const onGetRelampagoProductFailed = () => ({
  type: ON_GET_RELAMPAGO_PRODUCT_FAILED,
});

export const onGetProduct = (id: string) => {
  return async (dispatch: any) => {
    const response = await getProduct(id);
    if (response) {
      dispatch(onGetProductSucceeded(response));
    } else {
      dispatch(onGetProductFailed());
    }
  };
};

const onGetProductSucceeded = (productData: any) => ({
  type: ON_GET_PRODUCT_SUCCEEDED,
  productData,
});

const onGetProductFailed = () => ({
  type: ON_GET_PRODUCT_FAILED,
});

export const onGetAllProducts = () => {
  return async (dispatch: any) => {
    dispatch(onLoadingGetProductsStart());
    const response = await getAllProducts();
    if (response) {
      dispatch(onGetAllProductsSucceeded(response));
      dispatch(onLoadingGetProductsFinished());
    } else {
      dispatch(onGetAllProductsFailed());
      dispatch(onLoadingGetProductsFinished());
    }
  };
};

export const onGetAllProductsSucceeded = (allProductsData: any) => ({
  type: ON_GET_ALL_PRODUCTS_SUCCEEDED,
  allProductsData,
});

export const onGetAllProductsFailed = () => ({
  type: ON_GET_ALL_PRODUCTS_FAILED,
});

export const onGetStockAndPrice = (id: string) => {
  return async (dispatch: any) => {
    const response = await getStockAndPrices(id);
    if (response) {
      dispatch(onGetStockAndPriceSucceeded(response));
    } else {
      dispatch(onGetStockAndPriceFailed());
    }
  };
};

const onGetStockAndPriceSucceeded = (data: any) => ({
  type: ON_GET_STOCK_AND_PRICES_SUCCEEDED,
  data,
});

const onGetStockAndPriceFailed = () => ({
  type: ON_GET_STOCK_AND_PRICES_FAILED,
});

export const onGetHomeRelatedProducts = () => {
  return async (dispatch: any) => {
    const response = await getHomeRelatedProducts();
    if (response) {
      dispatch(onGetHomeRelatedProductsSucceeded(response));
    } else {
      dispatch(onGetHomeRelatedProductsFailed());
    }
  };
};

const onGetHomeRelatedProductsSucceeded = (productData: any) => ({
  type: ON_GET_HOME_RELATED_PRODUCTS_SUCCEEDED,
  productData,
});

const onGetHomeRelatedProductsFailed = () => ({
  type: ON_GET_HOME_RELATED_PRODUCTS_FAILED,
});

export const onGetNewRelatedProducts = () => {
  return async (dispatch: any) => {
    const response = await getNewRelatedProducts();
    if (response) {
      dispatch(onGetNewRelatedProductsSucceeded(response));
    } else {
      dispatch(onGetNewRelatedProductsFailed());
    }
  };
};

const onGetNewRelatedProductsSucceeded = (productData: any) => ({
  type: ON_GET_NEW_RELATED_PRODUCTS_SUCCEEDED,
  productData,
});

const onGetNewRelatedProductsFailed = () => ({
  type: ON_GET_NEW_RELATED_PRODUCTS_FAILED,
});

export const onGetRelatedProducts = (id: string) => {
  return async (dispatch: any) => {
    const response = await getRelatedProducts(id);

    if (response) {
      dispatch(onGetRelatedProductsSucceeded(response));
    } else {
      dispatch(onGetRelatedProductsFailed());
    }
  };
};

const onGetDefaulProductsSucceeded = (defaultProducts: any) => ({
  type: ON_GET_DEFAULT_PRODUCTS_SUCCEEDED,
  defaultProducts,
});

const onGetDefaulProductsFailed = () => ({
  type: ON_GET_DEFAULT_PRODUCTS_FAILED,
});

export const onGetSDefaultProducts = () => {
  return async (dispatch: any) => {
    const response = await getDefaultProduct();
    if (response) {
      dispatch(onGetDefaulProductsSucceeded(response));
    } else {
      dispatch(onGetDefaulProductsFailed());
    }
  };
};

const onGetRelatedProductsSucceeded = (productData: any) => ({
  type: ON_GET_RELATED_PRODUCTS_SUCCEEDED,
  productData,
});

const onGetRelatedProductsFailed = () => ({
  type: ON_GET_RELATED_PRODUCTS_FAILED,
});

export const onGetShippingTime = (cp: string, sku: string[] | string) => {
  return async (dispatch: any) => {
    const response = await getShippingTime(cp, sku);

    if (response) {
      dispatch(onGetShippingTimeSucceeded(response));
    } else {
      dispatch(onGetShippingTimeFailed());
    }
  };
};

const onGetShippingTimeSucceeded = (shippingTime: any) => ({
  type: ON_GET_SHIPPING_TIME_SUCCEEDED,
  shippingTime,
});

const onGetShippingTimeFailed = () => ({
  type: ON_GET_SHIPPING_TIME_FAILED,
});

export const onGetHolidays = () => {
  return async (dispatch: any) => {
    const response = await getHolidays();

    if (response) {
      dispatch(onGetholidaysSucceeded(response));
    } else {
      dispatch(onGetholidaysFailed());
    }
  };
};

const onGetholidaysSucceeded = (holidays: any) => ({
  type: ON_GET_HOLIDAYS_SUCCEEDED,
  holidays,
});

const onGetholidaysFailed = () => ({
  type: ON_GET_HOLIDAYS_FAILED,
});

export const onGetStock = () => {
  return async (dispatch: any) => {
    const response = await getStock();

    if (response) {
      dispatch(onGetStockSucceeded(response));
    } else {
      dispatch(onGetStockFailed());
    }
  };
};

const onGetStockSucceeded = (stock: any) => ({
  type: ON_GET_STOCK_SUCCEEDED,
  stock,
});

const onGetStockFailed = () => ({
  type: ON_GET_STOCK_FAILED,
});

export const onGetUnavailableDays = (
  postcode: number,
  products: boolean = false
) => {
  return async (dispatch: any) => {
    const response = await getUnavailableDays(postcode, products);

    if (response) {
      dispatch(onGetUnavailableDaysSucceeded(response));
    } else {
      dispatch(onGetUnavailableDaysFailed());
    }
  };
};

const onGetUnavailableDaysSucceeded = (days: any) => ({
  type: ON_GET_UNAVAILABLE_DAYS_SUCCEEDED,
  days,
});

const onGetUnavailableDaysFailed = () => ({
  type: ON_GET_UNAVAILABLE_DAYS_FAILED,
});

export const onGetNuevosDisenos = (flag: boolean) => {
  return async (dispatch: any) => {
    if (flag) {
      dispatch(onGetNuevoDisenosSucceeded(flag));
    } else {
      dispatch(onGetNuevoDisenosFailed(flag));
    }
  };
};
const onGetNuevoDisenosSucceeded = (flag: boolean) => ({
  type: ON_GET_NUEVOS_DISENOS_SUCCEEDED,
  flag,
});

const onGetNuevoDisenosFailed = (flag: boolean) => ({
  type: ON_GET_NUEVOS_DISENOS_FAILED,
  flag,
});

export const onGetQuizzOpenSucceeded = () => ({
  type: ON_OPEN_QUIZZ_SUCCEEDED,
});

export const onGetQuizzCloseFailed = () => ({
  type: ON_CLOSE_QUIZZ_FAILED,
});

export const onGetOpenOverlay = () => ({
  type: ON_GET_OPEN_OVERLAY,
});

export const onGetCloseOverlay = () => ({
  type: ON_GET_CLOSE_OVERLAY,
});

export const onGetShowNavbar = () => ({
  type: ON_GET_SHOW_NAVBAR,
});

export const onGetHideNavbar = () => ({
  type: ON_GET_HIDE_NAVBAR,
});

export const onSetBackorder = (
  variationId: string,
  backorderValue: boolean
) => {
  return async () => {
    await setBackorder(variationId, backorderValue);
  };
};
