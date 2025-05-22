import { quatityItemsProps } from "../../Step3/types";
import { itemsFilterJson } from "../../util";
import { IDataSendNotion, IInfoForm, UploadedImage } from "../types";
import items from "../../Step3/missingItems.json";
import {
  getActionType,
  getProveedor,
  idsFromUserFc,
  mapIssuesToNotionValues,
  parsePieces,
} from "./funtions";

const actionMap = {
  descuento: "Gestionar cobro extra",
  devolverlo: "Retiro",
};

const typeRequestMap = {
  descuento: "Orden con incidente",
  devolverlo: "Devolucion",
};
const differencePriceMap = {
  descuento: "Abona diferencia",
  devolverlo: "No aplica/Garantía",
};

export const fullInfo = (
  dataUser: any,
  notionInfo: IInfoForm,
  selectedValue: string,
  valueSelect: string,
  images: UploadedImage[],
  selectedTitleObjects: quatityItemsProps[],
  postalCode: string,
  inputValue: {
    direcction: string;
    postalCode: string;
  }
) => {
  const matchedItems = itemsFilterJson(items, dataUser.items);
  const pieces = matchedItems.flatMap((item) => item.pieces);

  const proveedor =
    dataUser._wc_shipment_tracking_items.length === 0
      ? "-"
      : dataUser._wc_shipment_tracking_items[
          dataUser._wc_shipment_tracking_items.length - 1
        ].map((item: any) => item.tracking_provider);

  const rawString = notionInfo.problemDescription[1];

  const { idMatched, idsFromUser } = idsFromUserFc(
    selectedTitleObjects,
    dataUser
  );

  const idChangeMatched = selectedTitleObjects.filter(
    (obj) => !idsFromUser.some((id: string) => obj.checkId.startsWith(id))
  );

  const fullInfo: IDataSendNotion = {
    orderNumber: String(dataUser.id),
    name: `${dataUser.billing.first_name} ${dataUser.billing.last_name}`,
    email: dataUser.billing.email,
    status: "A revisar 🕵️‍♀️",
    shippingDate:
      dataUser.date_created === undefined ? null : dataUser.date_created,
    requestDate: new Date(),
    typeRequest:
      Number(selectedValue) === 1
        ? "Orden con incidente"
        : Number(selectedValue) === 2
        ? getActionType(notionInfo.problemDescription, typeRequestMap)
        : Number(valueSelect) === 2
        ? "Devolucion"
        : "Cambio",
    typeChange:
      Number(selectedValue) === 3
        ? [
            {
              name: "Error de P/P",
            },
          ]
        : Number(selectedValue) === 4
        ? [
            {
              name: "Garantía",
            },
          ]
        : Number(valueSelect) === 3 &&
          notionInfo.problemDescription.includes("cambio")
        ? [
            {
              name: "De devo a cambio",
            },
          ]
        : [],
    reason:
      Number(selectedValue) === 1 || Number(selectedValue) === 3
        ? [{ name: "Otro" }]
        : Number(selectedValue) === 4 ||
          Number(valueSelect) === 2 ||
          Number(valueSelect) === 3
        ? mapIssuesToNotionValues(rawString).map((value) => ({
            name: value.name,
          }))
        : Number(selectedValue) === 2
        ? [{ name: "Error en la entrega" }]
        : [],
    action:
      Number(selectedValue) === 1
        ? "Nuevo pedido"
        : Number(selectedValue) === 2
        ? getActionType(notionInfo.problemDescription, actionMap)
        : Number(selectedValue) === 3 ||
          Number(selectedValue) === 4 ||
          Number(valueSelect) === 2 ||
          Number(valueSelect) === 3
        ? "Retiro"
        : "Ninguna",
    differencePrice:
      Number(selectedValue) === 2
        ? getActionType(notionInfo.problemDescription, differencePriceMap)
        : Number(valueSelect) === 2
        ? "Reembolso"
        : Number(valueSelect) === 3
        ? "-"
        : "No aplica/Garantía",
    refund: Number(valueSelect) === 2 ? "Reembolso pendiente" : "",
    supplier: proveedor !== false ? getProveedor(proveedor) : "-",
    images: images
      .filter((img) => !img.error)
      .map((img, index) => {
        return {
          name: `foto-reclamo-${(index + 1).toString().padStart(2, "0")}`,
          type: "external",
          external: {
            url: img.url || "",
          },
        };
      }),
    skuOriginal:
      (idMatched && Number(selectedValue) === 1) ||
      Number(selectedValue) === 3 ||
      Number(selectedValue) === 4 ||
      Number(valueSelect) === 2 ||
      Number(valueSelect) === 3
        ? Array.from<string>(
            new Set(idMatched.map((item: any) => item.sku as string))
          ).map((sku) => ({
            name: sku,
          }))
        : [
            {
              name: "-",
            },
          ],
    skuChange:
      (idMatched && Number(selectedValue) === 1) || Number(selectedValue) === 4
        ? Array.from<string>(
            new Set(idMatched.map((item: any) => item.sku as string))
          ).map((sku) => ({
            name: sku,
          }))
        : idChangeMatched &&
          idChangeMatched.map((item: any) => ({
            name: item.skuChange,
          })),
    skuQuantityOriginal:
      (idMatched && Number(selectedValue) === 1) ||
      Number(selectedValue) === 3 ||
      Number(selectedValue) === 4 ||
      Number(valueSelect) === 2 ||
      Number(valueSelect) === 3
        ? (() => {
            const skuQuantities: Record<string, number> = {};

            idMatched.forEach((item: any, index: number) => {
              const quantity =
                selectedTitleObjects[index]?.quantity ?? item.quantity;
              skuQuantities[item.sku] =
                (skuQuantities[item.sku] || 0) + quantity;
            });

            return Object.entries(skuQuantities)
              .map(([sku, quantity]) => `${sku}: x${quantity}`)
              .join(", ");
          })()
        : "",
    skuQuantityChange:
      (idMatched && Number(selectedValue) === 1) || Number(selectedValue) === 4
        ? (() => {
            const skuQuantities: Record<string, number> = {};

            idMatched.forEach((item: any, index: number) => {
              const quantity =
                selectedTitleObjects[index]?.quantity ?? item.quantity;
              skuQuantities[item.sku] =
                (skuQuantities[item.sku] || 0) + quantity;
            });

            return Object.entries(skuQuantities)
              .map(([sku, quantity]) => `${sku}: x${quantity}`)
              .join(", ");
          })()
        : idChangeMatched &&
          idChangeMatched
            .map((item: any) => {
              return `${item.skuChange}: ${
                item.quantity === undefined ? "x1" : `x${item.quantity}`
              }`;
            })
            .join(", "),
    peaces:
      Number(selectedValue) === 1 ? parsePieces(rawString, pieces).names : [],
    peacesChange:
      Number(selectedValue) === 1 ? parsePieces(rawString, pieces).names : [],
    peacesQuantity:
      Number(selectedValue) === 1
        ? parsePieces(rawString, pieces).quantities
        : "",
    comments:
      Number(selectedValue) === 1
        ? parsePieces(rawString, pieces).otherMessage
        : Number(selectedValue) === 2 || Number(selectedValue) === 3
        ? notionInfo.problemDescription.some(
            (desc: string) => desc.trim() === ""
          )
          ? notionInfo.problemDescription[0]
          : notionInfo.problemDescription.join(", ")
        : Number(selectedValue) === 4 ||
          Number(valueSelect) === 2 ||
          Number(valueSelect) === 3
        ? mapIssuesToNotionValues(rawString)
            .filter((value) => value.comments)
            .map((value) => value.comments)
            .join(", ")
        : "-",
    addressData: !postalCode
      ? null
      : Number(valueSelect) === 4 || postalCode === "no"
      ? "NO"
      : "SI",
    addressNew:
      inputValue.direcction !== "" && inputValue.postalCode !== ""
        ? `Direccion: ${inputValue.direcction}, CP: ${inputValue.postalCode}`
        : "",
  };

  return fullInfo;
};
