import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/utils/apolloClient";
import { getHygraphId } from "@/utils/hygraphIds";

export const runtime = 'edge';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
try {
    const { data } = await client.query({
        query: gql`
            query getPromosData {
                landingSEO(where:{id: "${getHygraphId('landing-promo-seo')}" }) {
                    id
                    title
                    description
                    image
                    url
                }
                landingPromo(where: { id: "${getHygraphId('landing-promo')}" }) {
                  lanzamientoUnoId
                  categoriaUno
                  lanzamientoDosId
                  categoriaDos
                  bancarioImageDesktop
                  bancarioImageMobile
                  bancarioTitle
                  bancarioContadorEnd
                  bancarioUnderText
                  relampagoId
                  relampagoText
                  relampagoRedireccionCategoria
                  relampagoContadorEnd
                  relampagoImageDesktop
                  relampagoImageMobile
                  relampagoCategoriaProduct
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
