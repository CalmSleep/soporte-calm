import { searchAttribute } from "@/utils/productsFunctios";
import variations_products from "@/utils/variations_products";

export function mapOrdersWithSpan(orders: any[]): any[] {
  const { tamano, alto, color } = searchAttribute(orders);

  return orders.map((order: any) => {
    const attrs = order.attributes || {};

    // Extrae los posibles valores del objeto de atributos (maneja "pa_" también)
    const tamanoValue = attrs.tamano || attrs.pa_tamano || "";
    const altoValue = attrs.alto || attrs.pa_alto || "";
    const colorValue = attrs.color || attrs.pa_color || "";

    // Verifica si ese valor está entre los globales
    const spanTamano = tamano.includes(tamanoValue) ? tamanoValue : "";
    const spanAlto = alto.includes(altoValue) ? altoValue : "";
    const spanColor = color.includes(colorValue) ? colorValue : "";

    // Formatea usando variations_products
    const span = [spanTamano, spanAlto, spanColor]
      .filter(Boolean)
      .map((val) => (variations_products as Record<string, string>)[val] || val)
      .join(", ");

    return {
      ...order,
      span,
    };
  });
}

export const itemsFilterJson = (items: any[], newOrders: any) => {
  return items
    .map((item) => {
      const matchingOrder = newOrders.find(
        (order: any) => order.product_id === Number(item.id)
      );
      if (!matchingOrder) return null;
      return {
        ...item,
        span: matchingOrder.span,
      };
    })
    .filter(Boolean);
};
