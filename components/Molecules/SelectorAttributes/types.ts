import { IChildrenProd } from "@/state/products/types";
import { Dispatch, SetStateAction } from "react";

export interface IProps {
  arrChildren?: IChildrenProd[];
  selected?: IChildrenProd;
  setSelected?: (id: string) => void;
  valToSearch?: string;
  arrOptions?: string[];
  selectedChild?: IChildrenProd;
  selectedProp?: string;
  setSelectedProp?: Dispatch<SetStateAction<string>>;
  sizeName: string;
  setIsSizeChange?: Dispatch<SetStateAction<boolean>>;
  setIsColorChange?: Dispatch<SetStateAction<boolean>>;
  hasRenders?: boolean;
  isCategory?: boolean;
  price?: number;
  onQuantityChange?: (quantity: number) => void;
  idProd?: string;
  isRP?: boolean;
}

export interface IPropsSize {
  arrChildren?: IChildrenProd[];
  selected?: IChildrenProd;
  setSelected: (id: string) => void;
  valToSearch: string;
  setIsSizeChange: Dispatch<SetStateAction<boolean>>;
  landing?: string;
  hasRenders?: boolean;
  isCategory?: boolean;
}

export interface SearchResult {
  [key: string]: {
    stock: number;
    backorder: boolean;
  };
}
