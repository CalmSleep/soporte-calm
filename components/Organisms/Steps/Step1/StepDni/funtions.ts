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
  const dniStr = dni.dni?.toString().trim();

  if (!dniStr) {
    errors.dni = "El DNI es obligatorio";
  } else if (/^0+$/.test(dniStr)) {
    errors.dni = "El DNI no puede estar compuesto solo por ceros";
  } else if (!/^\d+$/.test(dniStr)) {
    errors.dni =
      "El DNI solo puede contener números, sin espacios ni caracteres especiales";
  } else if (dniStr.length < 6 || dniStr.length > 14) {
    errors.dni = "El DNI debe tener entre 6 y 14 dígitos";
  }

  return errors;
};

export const emailResponse = (
  dataResponse: IOrderResponse[],
  email?: string
) => {
  return dataResponse.map((item: IOrderResponse): IOrdenMail => {
    return {
      id: item.id,
      // email: !email ? item.billing.email : email,
      email: "chofiikauffer@gmail.com",
      dni: item.dni || "",
      name: item.billing.first_name,
      phone: item.billing.phone,
      orderNumber: item.number,
      orderKey: item.order_key,
      orderStatus: item.status,
      total: item.total,
      saleSource: item.sale_source,
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
