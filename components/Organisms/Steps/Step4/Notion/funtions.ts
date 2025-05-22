import nomenclaruras from "./nomenclaturas.json";
import { ActionMap, Issue, ParsedResult, Piece } from "../types";
import { quatityItemsProps } from "../../Step3/types";

const normalize = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .trim();

export function getActionType(
  problemDescription: string[],
  actionMap: ActionMap
): string {
  const normalizedDescriptions = problemDescription.map((desc) =>
    desc.trim().toLowerCase()
  );

  for (const keyword in actionMap) {
    if (
      normalizedDescriptions.some((desc) =>
        desc.includes(keyword.toLowerCase())
      )
    ) {
      return actionMap[keyword];
    }
  }

  return "";
}

export const mapIssuesToNotionValues = (input: string): Issue[] => {
  const result: Issue[] = [];

  const matches = input.match(/\(([^)]+)\)/g);

  if (!matches) {
    return [{ name: "Otro" }];
  }

  for (const match of matches) {
    const items = match.slice(1, -1).split(",");
    for (const item of items) {
      const trimmed = item.trim();
      const normalizedItem = normalize(trimmed);

      const found = nomenclaruras.find(
        (option) => normalize(option.name) === normalizedItem
      );

      if (found?.name === "Otro") {
        result.push({ name: "Otro", comments: trimmed });
      } else if (found?.value === "Otro") {
        result.push({ name: "Otro", comments: trimmed });
      } else if (!found) {
        result.push({ name: "Otro", comments: trimmed });
      } else {
        result.push({ name: found.value });
      }
    }
  }
  return result;
};

export function parsePieces(rawString: string, pieces: Piece[]): ParsedResult {
  const normalizedPieces = pieces.map((p) => ({
    original: p.label,
    normalized: p.label.toLowerCase().replace(/\s/g, ""),
  }));

  const names: { name: string }[] = [];
  const quantitiesArr: string[] = [];
  const otherMessages: string[] = [];

  const matches = Array.from(rawString.matchAll(/([^,()]+)\s*\(([^)]+)\)/g));

  matches.forEach(([_, title, content]) => {
    const sectionName = title.trim().toLowerCase();

    if (sectionName === "otro") {
      const message = content.trim();
      if (message) {
        otherMessages.push(message);
      }
      return;
    }

    const items = content.split(",").map((i) => i.trim());

    items.forEach((item) => {
      const normalizedItem = item.toLowerCase().replace(/\s/g, "");

      const match = normalizedPieces.find((p) =>
        normalizedItem.includes(p.normalized)
      );

      if (match) {
        if (!names.some((n) => n.name === match.original)) {
          names.push({ name: match.original });
        }

        const qtyMatch = item.match(/x\s?(\d+)/i);
        if (qtyMatch) {
          quantitiesArr.push(`${match.original} x ${qtyMatch[1]}`);
        }
      }
    });
  });

  return {
    names,
    quantities: quantitiesArr.join(", "),
    otherMessage: otherMessages.join(", "),
  };
}

export const getProveedor = (proveedor: string) => {
  if (proveedor.includes("andreani")) {
    return "Andreani";
  }
  if (proveedor.includes("beetrack") || proveedor.includes("simpliroute")) {
    return "Flota Propia";
  }
  if (proveedor.includes("cruzdelsur")) {
    return "Cruz del Sur";
  }
  if (proveedor.includes("andesmar")) {
    return "Andesmar";
  }
  if (proveedor.includes("localm")) {
    return "Localm";
  }
  return "-";
};

export const idsFromUserFc = (
  selectedTitleObjects: quatityItemsProps[],
  dataUser: any
) => {
  const countByVariationId = selectedTitleObjects.reduce((acc, obj) => {
    const baseId = obj.checkId.split("-")[0];
    acc[baseId] = (acc[baseId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const variationCountArray = dataUser.items.filter((item: any) => {
    const variationId = item.variation_id?.toString?.();
    const productId = item.product_id?.toString?.();
    const ids = selectedTitleObjects.map((item) => item.checkId);

    return ids.some((id) =>
      variationId === "0"
        ? id === productId || id.startsWith(`${productId}-`)
        : id === variationId || id.startsWith(`${variationId}-`)
    );
  });

  const idMatched = variationCountArray.flatMap((item: any) => {
    const baseId =
      item.variation_id !== 0 && item.variation_id !== undefined
        ? item.variation_id.toString()
        : item.product_id.toString();

    const count = countByVariationId[baseId] || 1;

    return Array.from({ length: count }, () => ({ ...item }));
  });

  const idsFromUser = dataUser.items.map((item: any) =>
    String(item.variation_id || item.product_id)
  );

  return {
    idMatched,
    idsFromUser,
  };
};
