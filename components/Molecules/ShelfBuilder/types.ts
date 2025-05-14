import { ShelfData } from "@/components/Organisms/ShelfConfigurator/types";
import { IShelfProps } from "../ShelfModule/types";

export interface ShelfBuilderProps {
    shelfConfigurations: ShelfData[];
    maxRows: number;
    maxColumns: number;
    isCart?: boolean;
    editingModuleId?: number;
    isCard?: boolean;
    propsNames: IShelfProps
    isPreConfigView?: boolean;
}