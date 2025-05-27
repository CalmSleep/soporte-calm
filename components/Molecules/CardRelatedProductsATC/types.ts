import { ShelfData } from "@/components/Organisms/ShelfConfigurator/types";
import { IChildrenProd, IProduct } from "@/state/products/types";
import { IRelatedProductsATC } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { IShelfProps } from "../ShelfModule/types";

export interface IProps {
  image: IProduct["image_cross_selling"];
  name: string;
  description: string;
  shelfConfigurations: ShelfData[];
  propsNames: IShelfProps;
  idProduct: number;
  openModuleId?: number | undefined;
}
