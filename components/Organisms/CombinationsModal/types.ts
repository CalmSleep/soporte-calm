import { IShelfProps } from "@/components/Molecules/ShelfModule/types";
import { ShelfData } from "@/components/Organisms/ShelfConfigurator/types";
import { IChildrenProd } from "@/state/products/types";

export interface IProps {
    handleModal: () => void, 
    handleConfigurationChange: (config: ShelfData[]) => void,
    children: IChildrenProd[],
    propsNames: IShelfProps,
    setIsShelfConfigChanged: (changed: boolean) => void;
}
