import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/utils/apolloClient";
import { getHygraphId } from "@/utils/hygraphIds";

export const runtime = 'edge';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
try {
    const { data } = await client.query({
        query: gql`
          query getPillOfferProduct {
            pillOfferProducts(where: { OR: [{ id: "${getHygraphId('colchones-pill')}" }, { id: "${getHygraphId('bases-pill')}" }, { id: "${getHygraphId('almohadas-pill')}" }, { id: "${getHygraphId('ropa-de-cama-pill')}" }, { id: "${getHygraphId('nuevo-pill')}" }, { id: "${getHygraphId('30off-pill')}" }, { id: "${getHygraphId('15off-pill')}" }, { id: "${getHygraphId('accesorios-pill')}" }, { id: "${getHygraphId('muebles-pill')}" }] }) {
                id
                texto
                categoria
                colorFondo {
                  hex
                }
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