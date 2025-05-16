import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { message } = req.body;
    const data = JSON.parse(message);

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        "Numero de pedido (sin #)": {
          title: [
            {
              text: {
                content: data.orderNumber,
                link: {
                  url: `${
                    process.env.NEXT_PUBLIC_REDIRECT_URL_BASE
                  }/wp-admin/post.php?post=${String(
                    data.orderNumber
                  )}&action=edit`,
                },
              },
            },
          ],
        },
        "Nombre del cliente": {
          rich_text: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        "Fecha de solicitud": {
          date: {
            start: data.requestDate,
          },
        },
        "Fecha de creación del pedido": {
          date:
            data.shippingDate === null
              ? null
              : {
                  start: data.shippingDate,
                },
        },

        Email: {
          email: data.email,
        },
        Estado: {
          status: {
            name: data.status,
          },
        },
        "Tipo de solicitud": {
          select: {
            name: data.typeRequest,
          },
        },
        "Tipo de cambio": {
          multi_select: data.typeChange,
        },
        Razón: {
          multi_select: data.reason,
        },
        "Acción a tomar": {
          select: {
            name: data.action,
          },
        },
        "Diferencia de precio": {
          select: {
            name: data.differencePrice,
          },
        },
        Reembolso: {
          select:
            data.refund === ""
              ? null
              : {
                  name: data.refund,
                },
        },
        "Proveedor Logístico": {
          select: {
            name: data.supplier,
          },
        },
        Archivos: {
          files: data.images,
        },
        "SKU(s) original(es)": {
          multi_select: data.skuOriginal,
        },
        "SKU(s) a entregar": {
          multi_select: data.skuChange,
        },
        "Cantidad de SKU's originales": {
          rich_text: [
            {
              text: {
                content: data.skuQuantityOriginal,
              },
            },
          ],
        },
        "Pieza (si aplica)": {
          multi_select: data.peaces,
        },
        "Pieza a entregar (si aplica)": {
          multi_select: data.peacesChange,
        },
        "Cantidad de SKU's a entregar (o pieza)": {
          rich_text: [
            {
              text: {
                content:
                  data.skuQuantityChange === ""
                    ? data.peacesQuantity
                    : data.peacesQuantity + data.skuQuantityChange,
              },
            },
          ],
        },
        Comentarios: {
          rich_text: data.comments
            ? [
                {
                  text: {
                    content: data.comments,
                  },
                },
              ]
            : [],
        },
        "¿Misma dire?": {
          select:
            data.addressData === null
              ? null
              : {
                  name: data.addressData,
                },
        },
        "Nueva dire": {
          rich_text: [
            {
              text: {
                content: data.addressNew,
              },
            },
          ],
        },
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al agregar datos a Notion:", error);
    return res.status(500).json({
      message: "Error al agregar datos a Notion",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
