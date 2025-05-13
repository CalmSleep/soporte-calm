import { IShelfProps } from "@/components/Molecules/ShelfModule/types";
import { IChildrenProd } from "@/state/products/types";

export interface ShelfConfiguratorProps {
    setShelfConfigurations: (config: ShelfData[]) => void;
    shelfConfigurations: ShelfData[];
    handlePreconfigView: () => void;
    children: IChildrenProd[];
    openModuleId: number | undefined;
    setOpenModuleId: (id: number | undefined) => void;
    propsNames: IShelfProps
    setShelfConfigChanged: (changed: boolean) => void;
    addToCartEnabled?: boolean;
    isPreConfigModalOpen: boolean;
    setIsPreConfigModalOpen: (open: boolean) => void;
    setIsShelfConfigChanged: (changed: boolean) => void;
}

export interface ShelfPreconfigurationsProps {
  setShelfConfigurations: (config: ShelfData[]) => void;
  shelfConfigurations: ShelfData[];
  handlePreconfigView: () => void;
  children?: IChildrenProd[];
  propsNames: IShelfProps
  setShelfConfigChanged: (changed: boolean) => void;
}

  
export interface ShelfConfig {
  id: number;
  type: 'estante' | 'cabinet' | 'nicho';
  position: {
    row: number;
    column: number;
  };
  height: 'alta' | 'media' | 'baja';
  modulePosition: 'base' | 'extension' | 'sanguchito';
  isEditing?: boolean;
};
  
export interface ShelfData {
  moduleId: number;
  children: IChildrenProd;
  position: {
    row: number;
    column: number;
  };
  isEditing?: boolean;
};