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
              bannerAndCucardas(where: { OR: [{ id: "${getHygraphId('banner-colchones')}" }, { id: "${getHygraphId('banner-almohadas')}" }, { id: "${getHygraphId('banner-ropa-de-cama')}" }, { id: "${getHygraphId('banner-accesorios')}" }, { id: "${getHygraphId('banner-bases')}" }, { id: "${getHygraphId('baner-nuevos-lanzamienntos')}" }, { id: "${getHygraphId('banner-muebles')}" }] }) {
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