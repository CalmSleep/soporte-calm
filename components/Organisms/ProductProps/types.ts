import { IChildrenProd, IStockAndPrice } from "@/state/products/types";
import { Dispatch, SetStateAction } from "react";

export interface IProps {
  children?: IChildrenProd[];
  setSelectedChild: Dispatch<SetStateAction<IChildrenProd | undefined>>;
  stockAndPrices?: IStockAndPrice | IStockAndPrice[];
  selectedChild?: IChildrenProd;
  hasRenders?: boolean;
  isSizeChange?: boolean;
  setIsSizeChange: Dispatch<SetStateAction<boolean>>;
  category?: string;
  setIsColorChange?: Dispatch<SetStateAction<boolean>>;
  defaultProds: string[] | undefined;
  isCategory?: boolean;
  idProd?: string;
  onQuantityChange?: (quantity: number) => void;
  propsNames: IPropsNames;
  selectedGroup: IChildrenProd[];
  setSelectedGroup: Dispatch<SetStateAction<IChildrenProd[] | undefined>>;
  setQuantityOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export interface IPropsNames {
  tamano: string;
  alto: string;
  color: string;
  configuracion: string;
  posicion: string;
}
