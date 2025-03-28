import { IProduct } from "@/state/products/types";
import { ILandingSEO } from "@/types";
import axios from "axios";
import { getHygraphId } from "./hygraphIds";
import { IPillsData, IBannerAndCucarda, IPlainImageSlide } from "@/state/hygraph/types"
import { isHipno } from "./isHipno";

const componentRequest = async (id: string, landingKey: string, landingSEO?: string, hasEDE?: boolean, comboIds?: string[]) => {
  const requestConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "mode": 'no-cors'
    },
  };

  const p1 = new Promise((resolve) => {
    axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/products/get_cross_selling_products.php?id=${comboIds ? comboIds[0] : id}`, 
      requestConfig
    ).then(({data}) => {resolve(data)}).catch(() => {resolve(undefined)})
  });

  const p2 = new Promise((resolve) => {
    axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/products/get_default_products.php`,
      requestConfig
    ).then(({data}) => {resolve(data)}).catch(() => {resolve(undefined)})
  });

  const p3 = new Promise((resolve) => {
    axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/products/get_product_by_id.php?id=${id}&v=${process.env.NEXT_PUBLIC_API_VERSION}`,
      requestConfig
    ).then(({data}) => {resolve(data)}).catch(() => {resolve(undefined)})
  });

  const p4 = new Promise((resolve) => {
    axios.get(
      `https://calmessimple.com.ar/api/hygraph/${landingSEO ?? "almohadas_bases_product_seo_data"}`,
      requestConfig
    ).then(({data}) => {  
        resolve(data && data.data && data.data.landingSEOs && data.data.landingSEOs.find(
        (landingSEO: ILandingSEO) => landingSEO.id == getHygraphId(landingKey, process.env.NEXT_PUBLIC_CYBER_MODE == "true")
      ))
    }).catch(() => {resolve(undefined)})
  });

  const p5 = new Promise((resolve) => {
    axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/products/get_cross_selling_product_landing.php?id=${id}&v=${process.env.NEXT_PUBLIC_API_VERSION}`,
      requestConfig
    ).then(({data}) => {resolve(data && data)
    }).catch(() => {resolve(undefined)})
  });

  const p6 = new Promise((resolve) => {
    axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/hygraph/home_data.php?v=1`,
      requestConfig
    ).then(({data}) => {resolve(data && data)
    }).catch(() => {resolve(undefined)})
  });

  const p7 = new Promise((resolve, reject) => {
    axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL_BASE}/products/get_product_by_id.php?id=334&v=${process.env.NEXT_PUBLIC_API_VERSION}`,
      requestConfig
    ).then(({data}) => {resolve(data)}).catch((error) => {resolve(undefined)})
  });

  const promises = [p1, p2, p3, p4, p5, p6, p7]

  return await Promise.all(promises).then(
    (values: any[]) => {
      return {
        relatedProducts: values.length > 0 ? values[0] as IProduct[] : null,
        defaultProducts: !isHipno() ? (values.length > 1 ? values[1] as string[] : null) :
        ["CBASORISOM140000","ACCMARSUA140000","BASCAMSUA140000","ACCRESHOR140000","OCOHIBORI140000","COLHIBORI140000","OBECOLORI100000","OMACOLPER060000","OBLSABALG140000","OBLSABMIC200002","BASORISOM140000;C140","B100;C100","BASORISOM140000","OCOESPELE140000","OCOESPORI140000","BLAACCPRO140000","BEBCOLORI140000","MASCOLPER085000","BLACUBEDR140000","ALMALMDOB080000","ALMALMSIM065000","BLASABALG140000","BLACUBTUS140003","BLASABMIC140000","B140","C140"],
        product: values.length > 2 ? values[2] as IProduct : null,
        landingSEO: values.length > 3 && values[3] ? values[3] as ILandingSEO : {title: "", description: "", url: "", image: ""},
        relatedProductsATC : values.length > 4 && values[4] ? values[4] as any : null,
        bigBanner : values.length > 5 && values[5] && values[5].data && values[5].data.bigBanners ? values[5].data.bigBanners as IPlainImageSlide[] : null,
        colchon: values.length > 6 ? values[6] as IProduct : null
      }
    }
  );
}

export default componentRequest;