import colchonLandingContent from '@/jsons/ProductContent/334.json'
import colchonHibridoLandingContent from '@/jsons/ProductContent/2067781.json'
import baseLandingContent from "@/jsons/ProductContent/339.json"
import sommierLandingContent from "@/jsons/ProductContent/1993786.json"
import marcoSuavidad from '@/jsons/ProductContent/2196410.json'
import camaSuavidad from '@/jsons/ProductContent/2196407.json'
import respaldoHorizonte from '@/jsons/ProductContent/2196404.json'
import sofacama from '@/jsons/ProductContent/2288072.json';
import camaArticuladaLandingContent from '@/jsons/ProductContent/2358880.json'

export const skuColchonesOrBases = () => {
    let skusColchon = colchonLandingContent.skus.concat(colchonHibridoLandingContent.skus);
    let skusBases = baseLandingContent.skus.concat(sommierLandingContent.skus).concat(camaArticuladaLandingContent.skus);
    let skusSofaCama = sofacama.skus.concat(sommierLandingContent.skus);
    let skus = skusColchon.concat(skusBases).concat(skusSofaCama);
    return skus
}

export const skuBases = () => {
    let skusBases = baseLandingContent.skus.concat(sommierLandingContent.skus);
    return skusBases
}

export const skuColchones = () => {
    let skusColchon = colchonLandingContent.skus.concat(colchonHibridoLandingContent.skus);
    return skusColchon
}

export const skuSofa = () => {
    let skusSofa = sofacama.skus;
    return skusSofa
}

export const skuNewProducts = () => {
    let skuks = marcoSuavidad.skus.concat(camaSuavidad.skus.concat(respaldoHorizonte.skus));
    return skuks
}