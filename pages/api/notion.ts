import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { message } = req.body;
    const data = JSON.parse(message);

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        "Nombre del cliente": {
          rich_text: [
            {
              text: {
                content: data.name || 'Sin nombre',
              },
            },
          ],
        }
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error al agregar datos a Notion:', error);
    return res.status(500).json({ 
      message: 'Error al agregar datos a Notion',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
} 