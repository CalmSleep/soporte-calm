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
          date: {
            start: data.shippingDate,
          },
        },
        Email: {
          email: data.email,
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
        Archivos: {
          files: data.images,
        },
        "SKU(s) a entregar": {
          multi_select: data.sku,
        },
        Comentarios: {
          rich_text: [
            {
              text: {
                content: data.comments,
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
