import axios from "axios";
import { IAPIResponse } from "../types";

export const getCart = async () => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/get_cart.php`,
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const getVariation = async (id: string) => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    },
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/products/get_variation_by_id.php?id=${id}`,
    requestConfig
  );
  return await response.data;
};

export const getAllVariations = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    },
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/products/get_variation_by_id.php?get_all=1`,
    requestConfig
  );
  return await response.data;
};

export const addItemToCart = async (id: number, quantity: number) => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/add_items.php`,
    { id, quantity },
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const removeItem = async (key: string, product?: string) => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/remove_items.php`,
    { key, product: product ?? "" },
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const updateItem = async (key: string, quantity: number, product?: string) => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/update_items.php`,
    { key, quantity, product: product ?? "" },
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const clearCart = async (keys: { key: string }[]) => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/clear_cart.php`,
    { keys },
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const addCouponToCart = async (code: string) => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/add_coupon.php`,
    { code },
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const removeCouponFromCart = async (code: string) => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/remove_coupon.php`,
    { code },
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const updateShippingFromCart = async (postcode: string) => {
  const requestConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/cart/update_shipping.php`,
    { postcode, country: "AR" },
    requestConfig
  );
  return (await response.data) as IAPIResponse;
};

export const getCartRelatedProducts = async (ids: string[]) => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    },
  };
  const response = await axios.get(
    `${
      process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE
    }/products/get_cross_selling_cart_products.php?ids=${ids.join(";")}`,
    requestConfig
  );
  return await response.data;
};

export const getAllCartRelatedProducts = async () => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    },
  };
  const response = await axios.get(
    `${
      process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE
    }/products/get_cross_selling_cart_products.php?get_all=1`,
    requestConfig
  );
  return await response.data;
};
