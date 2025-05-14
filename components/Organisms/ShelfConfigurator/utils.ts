import { IChildrenProd } from '@/state/products/types';
import { ShelfData } from './types';

type PredefinedConfig = string[];

const findModulesBySku = (children: IChildrenProd[], sku: string) => {
  return children.find(child => child.sku === sku);
};

export const generateConfigurations = (
  children: IChildrenProd[], 
  predefinedConfigs: PredefinedConfig[]
): ShelfData[][] => {
  const configs = predefinedConfigs.map((config, configIndex) => {
    return config.map((sku, moduleIndex) => {
      const foundChild = findModulesBySku(children, sku);
      if (!foundChild) return null;
      
      return {
        moduleId: configIndex * 100 + moduleIndex + 1,
        children: foundChild,
        position: {
          row: 1,
          column: moduleIndex + 1
        }
      };
    }).filter(Boolean) as ShelfData[];
  });

  return configs;
};

export const updateModuleConfig = (
  shelfConfigurations: ShelfData[],
  moduleId: number, 
  updates: { 
    height?: 'alta' | 'media' | 'baja', 
    type?: string, 
    position?: 'base' | 'extension' | 'sanguchito' 
  },
  propsNames: {
    alto: string;
    configuracion: string;
    posicion: string;
  },
  children: IChildrenProd[]
): ShelfData[] => {
  return shelfConfigurations.map(module => {
    if (module.moduleId === moduleId) {
      const targetHeight = updates.height || module.children.attributes[propsNames.alto];
      const targetType = updates.type || module.children.attributes[propsNames.configuracion];
      const targetPosition = updates.position || module.children.attributes[propsNames.posicion];

      const matchingChildren = children.find((child: IChildrenProd) => 
        child.attributes[propsNames.alto] === targetHeight &&
        child.attributes[propsNames.configuracion] === targetType &&
        child.attributes[propsNames.posicion] === targetPosition
      );

      if (!matchingChildren) {
        console.error(`No se encontró un children que coincida con: alto=${targetHeight}, configuracion=${targetType}, posicion=${targetPosition}`);
        throw new Error("Children no encontrado en updateModuleConfig");
      }

      return { ...module, children: matchingChildren };
    }
    return module;
  });
}; 