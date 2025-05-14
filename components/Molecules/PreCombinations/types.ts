import { ShelfData } from "@/components/Organisms/ShelfConfigurator/types";
import { IChildrenProd } from "@/state/products/types";
import { IShelfProps } from "../ShelfModule/types";

export interface IProps {
    handleConfigurationChange: (config: ShelfData[]) => void
    isPreConfigModalOpen: boolean;
    setIsPreConfigModalOpen: (open: boolean) => void;
    children: IChildrenProd[]
    propsNames: IShelfProps
    setIsShelfConfigChanged: (changed: boolean) => void;
}
