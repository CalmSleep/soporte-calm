import { searchAttribute } from "@/utils/productsFunctios";
import variations_products from "@/utils/variations_products";
import { IOrdenMail } from "./Step1/StepDni/types";

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

export const infoString = (confirmedValue: string) => {
  return confirmedValue === "1"
    ? "Tuve un problema con el o los productos que recibí."
    : confirmedValue === "2"
    ? "Quiero devolver el producto"
    : confirmedValue === "3"
    ? "Quiero cambiar el producto"
    : "";
};

export function mapOrdersWithSpan(orders: any[]): any[] {
  const { tamano, alto, color } = searchAttribute(orders);

  return orders.map((order: any) => {
    const attrs = order.attributes || {};

    const tamanoValue = attrs.tamano || attrs.pa_tamano || "";
    const altoValue = attrs.alto || attrs.pa_alto || "";
    const colorValue = attrs.color || attrs.pa_color || "";

    // Verifica si ese valor está entre los globales
    const spanTamano = tamano.includes(tamanoValue) ? tamanoValue : "";
    const spanAlto = alto.includes(altoValue) ? altoValue : "";
    const spanColor = color.includes(colorValue) ? colorValue : "";

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
  const otros2: string[] = [];

  selectedTitles.forEach((title) => {
    if (title.toLowerCase().includes("continuemos")) {
      continuemos.push(title);
    } else {
      otros2.push(title);
    }
  });

  return [continuemos, otros2];
};

export const filterTitlesByCategories = (
  itemsChanges: { id: string; title: string; pieces: { label: string }[] }[],
  selectedTitles: string[]
): string[] => {
  const categoryTitles = itemsChanges.map((item) => item.title.toLowerCase());

  return selectedTitles.filter((title) =>
    categoryTitles.some((cat) => title.toLowerCase().includes(cat))
  );
};
export const extractItemsInParens = (matchedTitles: string[]): string[] => {
  const results: string[] = [];

  matchedTitles.forEach((title) => {
    const match = title.match(/\(([^)]+)\)/); // captura lo que está entre paréntesis
    if (match) {
      const items = match[1]
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean); // eliminar strings vacíos si hubiera
      results.push(...items);
    }
  });

  return results;
};

export function formatDateToISO(dateStr: string) {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}
