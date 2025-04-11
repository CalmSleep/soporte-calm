import { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import { Readable } from "stream";
import fetch from "node-fetch";

const ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN;
const UPLOAD_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ error: "Archivo no proporcionado" });
    }

    const buffer = Buffer.from(file.split(",")[1], "base64");

    const readable = Readable.from(buffer);

    const form = new FormData();
    form.append("file", readable, "upload.jpg");

    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: form as any,
    });

    const responseData: any = await response.json();

    if (response.ok && responseData.result?.variants?.[0]) {
      return res.status(200).json({ url: responseData.result.variants[0] });
    } else {
      return res.status(500).json({
        error: "Error al subir la imagen a Cloudflare",
        details: responseData,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}