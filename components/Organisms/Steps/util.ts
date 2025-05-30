import { searchAttribute } from "@/utils/productsFunctios";
import variations_products from "@/utils/variations_products";
import { IOrdenMail } from "./Step1/StepDni/types";
import { Resultado } from "./Step3/types";

export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  if (!domain) return email;

  return `${localPart[0]}${"*".repeat(localPart.length - 2)}${localPart.slice(
    -1
  )}@${domain}`;
};

export const isFromSpecialSource = (
  data?: IOrdenMail[],
  sources: string[] = ["bna", "provincia_compras", "aper", "ctc"]
): true | undefined => {
  const saleSource = data?.[0]?.saleSource;
  if (sources.includes(saleSource ?? "")) {
    return true;
  }
  return undefined;
};

export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function getMatchingQuizzIds(titles: string[], menuData: any) {
  if (!Array.isArray(menuData)) return [];
  return titles.flatMap((title) => {
    const normalizedTitle = normalizeText(title);

    const matchedItems =
      menuData &&
      menuData.filter((item: any) =>
        normalizeText(item.name).includes(normalizedTitle)
      );

    return matchedItems.flatMap(
      (item: any) => item.quizz?.map((q: any) => q.id) ?? []
    );
  });
}

export function mapOrdersWithSpan(orders: any[]): any[] {
  const { tamano, alto, color, configuracion, posicion } =
    searchAttribute(orders);

  return orders.map((order: any) => {
    const attrs = order.attributes || {};

    const tamanoValue = attrs.tamano || attrs.pa_tamano || "";
    const altoValue = attrs.alto || attrs.pa_alto || "";
    const colorValue = attrs.color || attrs.pa_color || "";
    const configuracionValue =
      attrs.configuracion || attrs.pa_configuracion || "";
    const posicionValue = attrs.posicion || attrs.pa_posicion || "";

    const spanTamano = tamano.includes(tamanoValue) ? tamanoValue : "";
    const spanAlto = alto.includes(altoValue) ? altoValue : "";
    const spanColor = color.includes(colorValue) ? colorValue : "";
    const spanConfiguracion = configuracion.includes(configuracionValue)
      ? configuracionValue
      : "";
    const spanPosicion = posicion.includes(posicionValue) ? posicionValue : "";

    const span = [
      spanTamano,
      spanAlto,
      spanColor,
      spanConfiguracion,
      spanPosicion,
    ]
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
    .flatMap((item) => {
      const itemIds = item.id.map((id: any) => Number(id));

      const matchingOrders = newOrders.filter((order: any) => {
        const variationId = Number(order.variation_id);
        const productId = Number(order.product_id);

        return itemIds.includes(variationId === 0 ? productId : variationId);
      });

      if (matchingOrders.length === 0) return null;

      return matchingOrders.flatMap((order: any) => {
        const variationId = Number(order.variation_id);
        const productId = Number(order.product_id);
        const matchedId = variationId === 0 ? productId : variationId;
        const quantity = order.quantity || 1;

        const baseCheck = {
          ...item,
          id: matchedId,
          idParent: productId,
          span: order.span,
          attributes: order.attributes,
          quantity: order.quantity,
        };

        return Array.from({ length: quantity }, () => ({ ...baseCheck }));
      });
    })
    .filter(Boolean);
};

export const selectedTitleOthers = (selectedTitles: string[]) => {
  let result: any = [];

  selectedTitles.forEach((title: string) => {
    const match = title.match(/\(([^)]+)\)/);
    if (match) {
      const contentInParens = match[1].split(", ").map((s) => s.trim());
      const otros = contentInParens.filter((item) =>
        item.toLowerCase().includes("otro")
      );
      const noOtros = contentInParens.filter(
        (item) => !item.toLowerCase().includes("otro")
      );

      const baseTitle = title.replace(/\s*,?\s*\([^)]*\)/, "").trim();
      if (baseTitle) {
        result.push(baseTitle);
      }

      if (noOtros.length) {
        result[result.length - 1] += ` (${noOtros.join(", ")})`;
      }

      otros.forEach((otro) => {
        result.push(`Otro (${otro.replace(/^Otro\s*x\s*/i, " ")})`);
      });
    } else {
      result.push(title);
    }
  });
  return result;
};

export const splitQuieroComprar = (selectedTitles: string[]) => {
  const quieroComprar: string[] = [];
  const otros: string[] = [];

  selectedTitles.forEach((title) => {
    if (title.toLowerCase().startsWith("quiero comprarlo")) {
      quieroComprar.push(title);
    } else {
      otros.push(title);
    }
  });

  return [quieroComprar, otros];
};
export const splitDevolucion = (selectedTitles: string[]) => {
  const continuemos: string[] = [];

  selectedTitles.forEach((title) => {
    if (title.toLowerCase().includes("continuemos")) {
      continuemos.push(title);
    }
  });

  return [continuemos];
};

export function normalize(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/["'(),\-:]/g, "")
    .replace(/\s+/g, " ");
}

export function isFlexibleMatch(
  attributeValue: string,
  targetString: string
): boolean {
  if (!attributeValue) return true;

  const normalizeText = (s: string) =>
    normalize(s)
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/(\d+)([a-zA-Z]+)/g, "$1 $2")
      .trim();

  const attr = normalizeText(attributeValue);
  const target = normalizeText(targetString);

  const extractDimensions = (s: string) => {
    const match = s.match(/(\d+)[x×](\d+)/);
    return match ? { ancho: match[1], largo: match[2] } : null;
  };

  const attrDims = extractDimensions(attr);
  const targetDims = extractDimensions(target);

  if (attrDims && targetDims) {
    return attrDims.ancho === targetDims.ancho;
  }

  return target.includes(attr) || attr.includes(target);
}

export function getResultados(
  selectedTitles: string[],
  infoChanges: any[],
  checkId: string[],
  products: any
): Resultado[] {
  return selectedTitles
    .map((str) => {
      const match = str.match(/^(.*?)\s*\(([^)]+)\)$/);
      const comentario = match ? match[2].trim() : "";

      const item = infoChanges.find((item) =>
        checkId?.some((id) => id === item.id || id.startsWith(`${item.id}-`))
      );

      if (!item) return null;

      const valueMatch = item.values.find((obj: any) =>
        Object.keys(obj).some((key) => normalize(key) === normalize(comentario))
      );
      if (!valueMatch) return null;

      const comentarioKey = Object.keys(valueMatch).find(
        (key) => normalize(key) === normalize(comentario)
      );
      if (!comentarioKey) return null;

      const value = valueMatch[comentarioKey];

      const childrenFull =
        (products &&
          products?.flatMap((p: any) =>
            p.products.flatMap((prod: any) =>
              prod.children.filter((child: any) =>
                value[2].some((id: string) => Number(id) === child.id)
              )
            )
          )) ||
        [];

      let child: any = null;

      if (childrenFull && childrenFull.length > 0 && value && value[0]) {
        const matchChild = childrenFull.find((child: any) => {
          const childAttributes = child.attributes || {};
          const itemAttributes = item.attributes || {};

          const tamanoValue =
            itemAttributes.pa_tamano || itemAttributes.tamano || "";
          const colorValue =
            itemAttributes.pa_color || itemAttributes.color || "";

          const childTamano =
            childAttributes.pa_tamano || childAttributes.tamano || "";
          const childColor =
            childAttributes.pa_color || childAttributes.color || "";

          const tamanoMatch = isFlexibleMatch(tamanoValue, childTamano);
          const colorMatch = isFlexibleMatch(colorValue, childColor);

          return tamanoMatch && colorMatch;
        });

        child = matchChild || childrenFull[childrenFull.length - 1];
      }

      return {
        productName: value?.[0],
        comentario: value?.[1],
        child,
      };
    })
    .filter((item): item is Resultado => item !== null);
}
