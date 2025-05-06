import { IChildrenProd, IProduct } from "./state/products/types";
import { IPillsData, IBannerAndCucarda } from "@/state/hygraph/types";
import { IPlainImageSlide } from "@/state/hygraph/types";
import { IHeaderBanner } from "@/state/hygraph/types";
/* import { IPromosProps } from "./components/Pages/PromosCalm/types"; */
declare global {
  interface Window {
    openWebChatbot?: (message?: string) => void;
  }
}

export interface ILanding {
  landingSEO: ILandingSEO;
  graphImageObject?: { [key: string]: string | number | object };
  graphWebPage?: { [key: string]: string | number | object };
  faqAccordion?: { title: string; description?: string }[];
}

export interface IHomeLanding extends ILanding {
  bigBanner: IPlainImageSlide[] | undefined;
  currentProductsRelated?: IProduct[] | null;
  colchon?: IProduct | null;
}

export interface IPromosLanding extends ILanding {
  promosInfo: /* IPromosProps */ any | undefined;
  products: IProduct[];
}

export interface ICategoryLanding extends ILanding {
  products: IProduct[];
}

export interface IProductLanding extends ILanding {
  relatedProducts?: IProduct[] | null;
  defaultProducts?: string[] | null;
  product?: IProduct | null;
  relatedProductsATC?: IRelatedProductsATC[] | null;
  landingContent: IProductContent;
}

export interface IComponentsLanding extends ILanding {
  relatedProducts?: IProduct[] | null;
  defaultProducts?: string[] | null;
  product?: IProduct | null;
  relatedProductsATC?: IRelatedProductsATC[] | null;
  bigBanner: IPlainImageSlide[] | null;
  colchon: IProduct | null | undefined;
  landingContent: IProductContent;
}

export interface ILandingSEO {
  id?: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface IBannerSidecart {
  colorBackground: string;
  colorText: string;
  textBanner: string;
}

export interface IRelatedProductsATC {
  image_cross_selling: string;
  attributes: [];
  backorder: boolean;
  category: string;
  discount: string;
  id_parent: string;
  id_prod: number;
  image_url: string;
  installments: number;
  name: string;
  name_parent: string;
  price: number;
  regular_price: number;
  short_description: string;
  sku: string;
  stock: number;
  children: IChildrenProd[];
  id: number;
}

interface IProductContent {
  key: string;
  productId: string;
  title: string;
  titleDescription: string;
  selectedLink: string;
  dreamDelivery: boolean;
  tranferDiscount?: string;
  skus: string;
  benefitsProduct?: Array<{
    imagen: string;
    texto: string;
  }>;
  textImages?: {
    firstText: string;
    secondText: string;
  };
  layoutImages?: string[];
  layoutImagesHaveVideo?: boolean;
  layoutImageHaveVideo?: {
    image0: boolean;
    image1: boolean;
    image2: boolean;
    image3: boolean;
  };
  accordionSpecsTexts?: Array<{
    title: string;
    description: string;
  }>;
  faqAccordionTitle: string;
  faqAccordion: Array<{
    title: string;
    description: string;
  }>;
  specsSectionTitles?: Array<{
    title: string;
    bold: string;
  }>;
  specsImages?: string;
  specsValues?: Array<{
    name: string;
    size: string;
  }>;
  skusFeria?: string;
  headPills?: string;
  titleAndVideo?: {
    title: string;
    video: string;
    imgVideo: string;
  };
  videoTitle?: string;
  keyFeatures?: Array<{
    mediaSrc: string;
    mediaSrcMobile: string;
    subtitle: string;
  }>;
  keyFeatureHaveVideo?: Array<{
    video: boolean;
  }>;
  specsCamaOla?: Array<{
    title: string;
    subtitle: string;
    description: string;
    img: string;
  }>;
  renders?: {
    [key: string]: string;
  };
  estructuraInfo?: Array<{
    title: string;
    description: string;
  }>;
  estructuraImagen?: string;
  ATCImage?: string;
  reviewsTitle?: {
    title: string;
    bold: string;
  };
  capasInfo?: Array<{
    title: string;
    image: string | null;
    description: string;
  }>;
  RRSSLinks?: Array<string>;
  SecondheadPills?: string;
  generalSpecsDescription?: string;
  comboIds?: Array<string>;
}
