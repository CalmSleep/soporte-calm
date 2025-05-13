import { IAttributes, IChildrenProd } from "@/state/products/types"

export const childrenVariationWithoutStock = (selectedChild?: IChildrenProd) => {
    const childToValidate = selectedChild

    if (childToValidate) {
      return childToValidate.stock <= 0 && !childToValidate.backorder
    }
    return false
  }

export const allChildrenWithoutStock = (selectedGroup?: IChildrenProd[]) => {
    if (selectedGroup) {
        let allWithoutStock = 0

    selectedGroup?.forEach((child) => {
        if (child.stock <= 0 && !child.backorder) {
            allWithoutStock++
        }
    })

    const result = selectedGroup?.length === allWithoutStock

    return result
}
    return false
}

export const searchAttribute = (children?: IChildrenProd[]) => {
  let arrValuesAttr = {
    tamano: [] as string[],
    alto: [] as string[],
    color: [] as string[],
    configuracion: [] as string[],
    posicion: [] as string[]
  }

    if (children) {
    children.forEach((variation) => {
        for (let clave in variation.attributes) {
            const { attributes } = variation
    
            if (clave.includes("tamano")) {
                if (
                    !arrValuesAttr.tamano.includes(
                      attributes[
                        clave as keyof typeof attributes
                      ]
                    )
                  ) {
                    arrValuesAttr.tamano.push(
                        attributes[
                            clave as keyof typeof attributes
                        ]
                      )
                  }
            }
    
            if (clave.includes("alto")) {
                if (
                    !arrValuesAttr.alto.includes(
                      attributes[
                        clave as keyof typeof attributes
                      ]
                    )
                  ) {
                    arrValuesAttr.alto.push(
                        attributes[
                            clave as keyof typeof attributes
                        ]
                      )
                  }
            }
    
            if (clave.includes("color")) {
                if (
                    !arrValuesAttr.color.includes(
                      attributes[
                        clave as keyof typeof attributes
                      ]
                    )
                  ) {
                    arrValuesAttr.color.push(
                        attributes[
                            clave as keyof typeof attributes
                        ]
                      )
                  }
            }

            if (clave.includes("configuracion")) {
                if (
                    !arrValuesAttr.configuracion.includes(
                      attributes[
                        clave as keyof typeof attributes
                      ]
                    )
                  ) {
                    arrValuesAttr.configuracion.push(
                        attributes[
                            clave as keyof typeof attributes
                        ]
                      )
                  } 
            }

            if (clave.includes("posicion")) {
                if (
                    !arrValuesAttr.posicion.includes(
                      attributes[
                        clave as keyof typeof attributes
                      ]
                    ) 
                  ) {
                    arrValuesAttr.posicion.push(
                        attributes[
                            clave as keyof typeof attributes
                        ]
                      )
                  }
            }
        }})
        }

        if (arrValuesAttr.configuracion.length > 0) {
          arrValuesAttr.configuracion.sort((a, b) => {
              const order = { 'estante': 0, 'cabinet': 1, 'nicho': 2 };
              return order[a as keyof typeof order] - order[b as keyof typeof order];
          });
        }
      
       return arrValuesAttr
    }

export const atrrToRender = (children?: IChildrenProd[]) => {
  let propsNames = {
    tamano: "",
    alto: "",
    color: "",
    configuracion: "",
    posicion: ""
  }

    if (children) {
    children.forEach((variation) => {
        for (let clave in variation.attributes) {
    
          if (clave.includes("tamano")) {
            propsNames.tamano = clave
          }
    
          if (clave.includes("alto")) {
            propsNames.alto = clave
          }
    
          if (clave.includes("color")) {
            propsNames.color = clave
          }
          
          if (clave.includes("configuracion")) {
            propsNames.configuracion = clave
          }

          if (clave.includes("posicion")) {
            propsNames.posicion = clave
          }
        }
      })
    }
    return propsNames
}