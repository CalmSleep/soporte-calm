import nomenclaruras from "./nomenclaturas.json";
import { ActionMap, Issue, ParsedResult, Piece } from "./types";

const normalize = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remueve acentos
    .replace(/[^a-zA-Z0-9\s]/g, "") // remueve símbolos especiales
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

export const skuFilterProduct = (dataUser: any, rawString: string) => {
  return dataUser.items
    .filter((item: any) => {
      const productNames = rawString.split(/,(?![^\(]*\))/).map((entry) =>
        entry
          .replace(/\(.*?\)/g, "")
          .trim()
          .toLowerCase()
      );

      return productNames.some((name: string) =>
        item.product_name.toLowerCase().includes(name)
      );
    })
    .map((item: any) => ({ name: item.sku }));
};

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

  console.log("result");

  return result;
};

// export const mapIssuesToNotionValues = (input: string): string[] => {
//   const result = new Set<string>();

//   const matches = input.match(/\(([^)]+)\)/g);

//   if (!matches) {
//     result.add("Otro");
//     return Array.from(result);
//   }

//   for (const match of matches) {
//     const items = match.slice(1, -1).split(",");
//     for (const item of items) {
//       const normalizedItem = normalize(item);
//       const found = nomenclaruras.find(
//         (option) => normalize(option.name) === normalizedItem
//       );
//       result.add(found?.value || "Otro");
//     }
//   }
//   console.log("result", Array.from(result));

//   return Array.from(result);
// };

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
    otherMessage: otherMessages.join(", "), // ahora junta todos los mensajes
  };
}

export const getProveedor = (proveedor: string) => {
  if (proveedor.includes("andreani")) {
    return "Andreani";
  }
  if (proveedor.includes("beetrack") || proveedor.includes("simpliroute")) {
    return "Flota Propia";
  }
  if (proveedor.includes("cruz")) {
    return "Cruz del Sur";
  }
  if (proveedor.includes("andesmar")) {
    return "Andesmar";
  }
  if (proveedor.includes("local")) {
    return "Localm";
  }
  return "-";
};
