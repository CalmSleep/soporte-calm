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
                landingSEOs(where: { OR: [{ id: "${getHygraphId('base')}" }, { id: "${getHygraphId('sommier')}" }, { id: "${getHygraphId('cama-suavidad')}" }, { id: "${getHygraphId('respaldo-horizonte')}" }, { id: "${getHygraphId('marco-suavidad')}" }] }) {
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