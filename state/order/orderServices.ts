import { IOrdenMail } from "@/components/Molecules/StepBody/StepDni/types";
import axios, { AxiosError } from "axios";

export const getOrder = async (id: string, order_key: string) => {
  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/order/get_order.php`,
    { id, order_key },
    requestConfig
  );
  return response.data;
};

export const getSeguimiento = async (
  orden: string,
  seguimiento_email: string
) => {
  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/order/get_seguimiento.php?mail=${seguimiento_email}&order=${orden}`,
    requestConfig
  );

  return await response.data;
};

export const getCardInfo = async (bin: number | string) => {
  const requestConfig = {
    // withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/order/card_bin_with_exceptions.php?bin=${bin}&v=${process.env.NEXT_PUBLIC_CARD_PROMOS_VERSION}`,
    requestConfig
  );

  return await response.data;
};

export const onSendOrderAndPaymentData = async (data: any) => {
  const token = sessionStorage.getItem("tokenSession");
  const reqConfig = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const req = { formData: data };
  const url = `${process.env.NEXT_PUBLIC_GANDALF_URL}/${process.env.NEXT_PUBLIC_GANDALF_ENVIROMENT}/orders`;

  if (url) {
    try {
      const resp = await axios.post(
        url,
        {
          ...req.formData,
        },
        reqConfig
      );
      return resp.data;
    } catch (error: any) {
      return error?.response?.data ?? error?.message;
    }
  }
};

export const onSendLinkToPayOrderAndPaymentData = async (data: any) => {
  const token = sessionStorage.getItem("tokenSession");
  const reqConfig = {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const req = { formData: data };

  const url = `${process.env.NEXT_PUBLIC_GANDALF_PAY}/${process.env.NEXT_PUBLIC_GANDALF_ENVIROMENT}/orders/pay`;

  if (url) {
    try {
      const resp = await axios.post(
        url,
        {
          ...req.formData,
        },
        reqConfig
      );
      return resp.data;
    } catch (error: any) {
      return error?.response?.data ?? error?.message;
    }
  }
};

export const getCpFlota = async () => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/shipping/get_cps_flota_propia.php`,
    reqConfig
  );
  return response;
};

export const getCpCaba = async () => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/shipping/get_cps_caba.php`,
    reqConfig
  );
  return response;
};

export const onGetToken = async () => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const url = `${process.env.NEXT_PUBLIC_GANDALF_URL}/${
    process.env.NEXT_PUBLIC_GANDALF_ENVIROMENT
  }/token?param=${Math.random()}_${Math.random()}_${Math.random()}`;

  if (url) {
    try {
      const resp = await axios.get(url, reqConfig);

      return await resp.data;
    } catch (err) {
      return {};
    }
  }
};

export const getDeliveryTimes = async (
  date: string,
  postcode: string,
  ede: boolean
) => {
  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  let url = `https://mirror.calmessimple.com.ar/ms/delivery-ranges/?date=${date}&postcode=${postcode}`;
  if (ede) {
    url = `${url}&ede=true`;
  }

  const response = await axios.get(url, requestConfig);
  return response.data;
};

export const onVerifyOrderExist = async (
  order_id: number,
  order_key: string
) => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const req = {
    order_id,
    order_key,
  };

  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/order/order_is_paid.php`,
    req,
    reqConfig
  );
  return resp.data;
};

export const getRDC = async (mail: string) => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      "Cache-Control": "no-cache",
    },
  };

  const response = await axios.get(
    `https://calmessimple.com.ar/referidos/uses_by_email.php?email=${mail}`,
    requestConfig
  );
  return response.data;
};

export const getForgottenEmail = async (mail: string) => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/seguimiento/mandamail.php?mail=${mail}`,
    reqConfig
  );
  return response.data;
};

export const getPublicIpClient = async () => {
  const response = await axios.get("https://api.ipify.org/");

  return response.data;
};

export const getNoShippingCPs = async () => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/shipping/get_no_shipping_cps.php`,
    reqConfig
  );
  return response;
};

export const getOrderByDni = async (dni: string) => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/order/get_order_by_dni.php?dni=${dni}`,
    reqConfig
  );
  return response.data;
};

export const sendEmailOrderDni = async (data: IOrdenMail[]) => {
  const reqConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/soporte/orders-mail.php`,
    data,
    reqConfig
  );
  return response.data;
};

interface INotionData {
  name: string;
  email: string;
  phone: string;
  message: string;
  status?: string;
}

export const sendToNotion = async (data: INotionData) => {
  const reqConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/soporte/notion-endpoint.php`,
    data,
    reqConfig
  );
  return response.data;
};
