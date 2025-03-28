import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/utils/apolloClient";
import { getHygraphId } from "@/utils/hygraphIds";

export const runtime = 'edge';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
try {
    const { data } = await client.query({
        query: gql`
            query getLandingSEO {
                landingSEOs(where: { OR: [{ id: "${getHygraphId('30-noches')}" }, { id: "${getHygraphId('404')}" }, { id: "${getHygraphId('envios')}" }, { id: "${getHygraphId('pago')}" }, { id: "${getHygraphId('tyc-promotion-landing')}" }, { id: "${getHygraphId('cyber-monday')}" }, { id: "${getHygraphId('mantenimiento')}" }, { id: "${getHygraphId('siestario-calm')}" }, { id: "${getHygraphId('hot-sale')}" }] }) {
                    id
                    title
                    description
                    image
                    url
                }
          }
        `,
      });
      return new Response(
        JSON.stringify({
          data
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        },
      ) 
 } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
}
};