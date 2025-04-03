import {
  DniInput,
  ErrorInput,
  IItemOrden,
  IOrdenMail,
  IOrderItem,
  IOrderResponse,
} from "./types";

export const validateDni = (dni: DniInput): ErrorInput => {
  const errors: ErrorInput = {};

  const dniStr = dni.dni.toString();

  if (!/^\d+$/.test(dniStr)) {
    errors.dni =
      "El DNI solo puede contener números, sin espacios ni caracteres especiales";
  } else if (dniStr.length !== 8) {
    errors.dni = "El DNI debe tener exactamente 8 dígitos";
  }

  return errors;
};

export const emailResponse = (dataResponse: IOrderResponse[]) => {
  return dataResponse.map((item: IOrderResponse): IOrdenMail => {
    return {
      id: item.id,
      // email: item.billing.email,
      email: "chofiikauffer@gmail.com",
      dni: item.dni || "",
      name: item.billing.first_name,
      orderNumber: item.number,
      orderKey: item.order_key,
      orderStatus: item.status,
      total: item.total,
      items:
        item.items &&
        item.items.map(
          (item: IOrderItem): IItemOrden => ({
            name: item.product_name,
            quantity: item.quantity,
            price: item.total || "0",
          })
        ),
      buttonRedirect: `${process.env.NEXT_PUBLIC_ENDPOINT_URL_SOPORT}/${item.id}?orderKey=${item.order_key}`,
    };
  });
};
