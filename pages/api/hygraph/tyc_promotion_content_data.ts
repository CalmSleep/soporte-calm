import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/utils/apolloClient";
import { getHygraphId } from "@/utils/hygraphIds";

export const runtime = 'edge';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const queryName = process.env.NEXT_PUBLIC_HYPERGRAPH_USER == "it" ? "tyCPromotion" : "tycPromotion"

try {
    const { data } = await client.query({
        query: gql`
          query getTyCPromotion {
            ${queryName}(where: { id: "${getHygraphId('tyc-promotion')}" }) {
              id
              promo {
                html
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