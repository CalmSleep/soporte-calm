import { ShelfConfig, ShelfData } from "@/components/Organisms/ShelfConfigurator/types";

export type ShelfModuleProps = {
    arrConfig: string[];
    module: ShelfData;
    updateModuleConfig: (moduleId: number, updates: { height?: 'alta' | 'media' | 'baja', type?: string, position?: 'base' | 'extension' | 'sanguchito' }) => void;
    index: number;
    title: string;
    isPreconfig?: boolean;
    setShelfConfigurations: (configurations: ShelfData[]) => void;
    shelfConfigurations: ShelfData[];
    arrOptions: string[];
    onModuleClick?: (id: number) => void;
    isOpenConfig?: boolean;
    activeView?: 'single' | 'preconfig';
    openModuleId?: number;
    setOpenModuleId?: (id: number) => void;
    toggleModule?: (id: number) => void;
    propsNames: IShelfProps
}

export type IShelfProps = {
    posicion: string;
    configuracion: string;
    alto: string;
}

