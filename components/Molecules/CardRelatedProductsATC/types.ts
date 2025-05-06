import { IChildrenProd, IProduct } from "@/state/products/types";
import { IRelatedProductsATC } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface IProps {
  image: IProduct["image_cross_selling"];
  name: string;
  description: string;
}
