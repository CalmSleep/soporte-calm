import colchonLandingContent from '@/jsons/ProductContent/334.json'
import colchonHibridoLandingContent from '@/jsons/ProductContent/2067781.json'
import baseLandingContent from '@/jsons/ProductContent/339.json'
import sommierLandingContent from '@/jsons/ProductContent/1993786.json'

export const itemIsEDEAble = (sku: string): boolean => {
    let skus = colchonLandingContent.skus.concat(colchonHibridoLandingContent.skus);
    skus = skus.concat(baseLandingContent.skus)
    skus = skus.concat(sommierLandingContent.skus)
    return skus.includes(sku)
}