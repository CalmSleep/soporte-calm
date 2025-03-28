import { IProduct } from "@/state/products/types";

export type RelatedProductsProps = {
    relatedItems?: IProduct[] | null;
    title: string;
    boldTitle?: string;
    isYellowTitle?: boolean;
    isMobile?: boolean;
    fromCart?: boolean;
    fromProduct?: boolean
    isForLCP?: boolean
    render?: boolean
    isHome?: boolean
}