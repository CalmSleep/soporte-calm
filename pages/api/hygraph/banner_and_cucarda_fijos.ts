import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/utils/apolloClient";
import { getHygraphId } from "@/utils/hygraphIds";

export const runtime = 'edge';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
try {
    const { data } = await client.query({
        query: gql`
            query getBannerAndCucarda {
                bannerAndCucardas(where: { OR: [{ id: "${getHygraphId('banner-promo-ocio')}" }, { id: "${getHygraphId('banner-promo-arrime-ocio')}" }, { id: "${getHygraphId('banner-promo-colchon-cumbre-dual')}" }, { id: "${getHygraphId('banner-promo-galicia')}" }, { id: "${getHygraphId('banner-promo-mesa-habito-flotante')}" }, { id: "${getHygraphId('banner-promo-mesa-habito')}" }, { id: "${getHygraphId('banner-promo-marco-suavidad')}" }] }) {
                    id
                    banner
                    cucarda
                    categoria
                    cupon
                    promoFija
                    idProductoFijo
                    promo
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