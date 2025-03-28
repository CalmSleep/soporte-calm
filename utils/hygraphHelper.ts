import { ILandingSEO } from "../types";
import client from "./apolloClient";
import { gql } from "@apollo/client";

export const getLandingSEO = async (id: string) => {
    try {
        const { data }: { data: { landingSEO: ILandingSEO } } = await client.query({
            query: gql`
                query getLandingSEO {
                    landingSEO(where: { id: "${id}" }) {
                        title
                        description
                        image
                        url
                    }
                }
            `,
        });
        return data?.landingSEO || { title: "", description: "", url: "", image: "" };
    } catch (error) {
        console.error('Error fetching landing SEO:', error);
        return { title: "", description: "", url: "", image: "" };
    }
};
/* 
export const getHomeData = async (landingSEOId: string, bannerId: string) => {
    try {
        const { data } : {data: {bigBanner: IPlainImageSlide[], landingSEO: ILandingSEO}} = await client.query({
            query: gql`
                query getHomeData {
                    landingSEO(where:{id: "${landingSEOId}"}) {
                        title
                        description
                        image
                        url
                    }
                    bigBanner(where:{id: "${bannerId}"}) {
                        imagesData
                    }
                }
            `,
        });
        return {landingSEO: data?.landingSEO || {title: "", description: "", url: "", image: ""}, bigBanner: data.bigBanner};
    } catch (error) {
        console.error('Error fetching landing SEO:', error);
        return {landingSEO: {title: "", description: "", url: "", image: ""}, bigBanner: {imagesData: []}};
    }
} */