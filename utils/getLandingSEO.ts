import axios from "axios";

export const getLandingSEO = async (id: string, url?: string) => {
    const requestConfig = {
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "mode": 'no-cors'
        },
    };

    try {
        const response = await axios.get(
            `https://calmessimple.com.ar/api/hygraph/${url ?? "other_static_seo_data"}`,
            requestConfig
        );

        let landingSEO =
            response && 
            response.data &&
            response.data.data &&
            response.data.data.landingSEOs &&
            response.data.data.landingSEOs.find((data: { id: string; }) => data.id == id);
        
        return landingSEO ?? { title: "", description: "", url: "", image: "" };
    } catch (error) {
       /*  console.error('Error fetching SEO data:', error); */
        return { title: "", description: "", url: "", image: "" };
    }
};

export const getHeadbannerData = async () => {
    const requestConfig = {
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "mode": 'no-cors'
        },
    };

    try {
        const response = await axios.get(
            `https://calmessimple.com.ar/api/hygraph/head_banners_data`,
            requestConfig
        );

        return response.data.data.headBanners ?? null;
    } catch (error) {
        return null;
    }
};