import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/utils/apolloClient";
import { getHygraphId } from "@/utils/hygraphIds";

export const runtime = 'edge';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
try {
    const { data } = await client.query({
        query: gql`
          query getHeadBanner {
            headBanners(where: { OR: [{ id: "${getHygraphId('home-head-banner')}" }, { id: "${getHygraphId('colchones-head-banner')}" }, { id: "${getHygraphId('mascotas-head-banner')}" }, { id: "${getHygraphId('bb-head-banner')}" }, { id: "${getHygraphId('bases-head-banner')}" }, { id: "${getHygraphId('almohadas-head-banner')}" }, { id: "${getHygraphId('ropa-de-cama-head-banner')}" } , { id: "${getHygraphId('nuevos-lanzamientos-head-banner')}" } , { id: "${getHygraphId('muebles-head-banner')}" } , { id: "${getHygraphId('accesorios-head-banner')}" }] }) {
                id
                categoria
                comienzoUltimosDias
                comienzoUltimoDia
                comienzoExtendimos
                ultimosDiasExtendimos
                utimoDiaExtendimos
                textoInferior { 
                  html
                }
                textoUltimosDias {
                    html
                }
                textoUltimoDia {
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